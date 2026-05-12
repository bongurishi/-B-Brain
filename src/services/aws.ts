import { CostExplorerClient, GetCostAndUsageCommand } from "@aws-sdk/client-cost-explorer";

export async function getCloudCostLeakage(accessKeyId?: string, secretAccessKey?: string, region = "us-east-1") {
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS Credentials");
  }

  const client = new CostExplorerClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });

  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 30);
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: formatDate(start),
      End: formatDate(now)
    },
    Granularity: "DAILY",
    Metrics: ["UnblendedCost", "UsageQuantity"],
    GroupBy: [
      { Type: "DIMENSION", Key: "SERVICE" }
    ]
  });

  try {
    const response = await client.send(command);
    return response.ResultsByTime;
  } catch (err) {
    console.error("AWS Cost Explorer Error:", err);
    throw err;
  }
}
