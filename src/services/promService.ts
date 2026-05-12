import axios from "axios";

export async function queryPrometheus(promUrl: string, query: string) {
  if (!promUrl) {
    throw new Error("Missing Prometheus URL");
  }

  try {
    const url = new URL("/api/v1/query", promUrl).toString();
    const response = await axios.get(url, {
      params: { query }
    });

    if (response.data && response.data.status === "success") {
      return response.data.data.result;
    }
    throw new Error("Invalid prometheus response");
  } catch (err) {
    console.error("Prometheus Query Error:", err);
    throw err;
  }
}
