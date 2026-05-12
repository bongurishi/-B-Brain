import * as k8s from "@kubernetes/client-node";

function getK8sConfig() {
  const kc = new k8s.KubeConfig();
  try {
    kc.loadFromDefault();
    return kc;
  } catch (err) {
    console.error("No default kubeconfig found, falling back to empty config.");
    return null;
  }
}

export async function getPods(namespace = "default") {
  const kc = getK8sConfig();
  if (!kc) throw new Error("Kubernetes not configured");

  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  try {
    const res = await k8sApi.listNamespacedPod({ namespace });
    return res.items.map(pod => ({
      name: pod.metadata?.name,
      status: pod.status?.phase,
      restarts: pod.status?.containerStatuses?.[0]?.restartCount || 0,
      createdAt: pod.metadata?.creationTimestamp
    }));
  } catch (err) {
    console.error("Kubernetes Pod Error:", err);
    throw err;
  }
}

export async function scaleDeployment(name: string, replicas: number, namespace = "default") {
  const kc = getK8sConfig();
  if (!kc) throw new Error("Kubernetes not configured");

  const appsApi = kc.makeApiClient(k8s.AppsV1Api);
  try {
    const deployment = await appsApi.readNamespacedDeployment({ name, namespace });
    // Update replicas
    if (!deployment.spec) deployment.spec = { selector: { matchLabels: {} }, template: {} } as k8s.V1DeploymentSpec;
    deployment.spec.replicas = replicas;
    
    await appsApi.replaceNamespacedDeployment({ name, namespace, body: deployment });
    return true;
  } catch (err) {
    console.error("Kubernetes Scaling Error:", err);
    throw err;
  }
}
