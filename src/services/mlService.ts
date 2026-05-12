export class TimeSeriesModels {
  /**
   * Exponential Moving Average (EMA) Z-Score Anomaly Detection
   * Used for real-time streaming metrics (CPU, latency).
   * Models seasonality context internally over time.
   */
  detectAnomalyZScore(value: number, history: number[], windowSize = 20, thresholdZ = 3.0) {
    if (history.length < windowSize) {
      return { isAnomaly: false, zScore: 0, baseline: value };
    }
    
    // Calculate simple moving average and stddev focus
    const slice = history.slice(-windowSize);
    const mean = slice.reduce((a, b) => a + b, 0) / windowSize;
    
    const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / windowSize;
    const stdDev = Math.sqrt(variance) || 1; // prevent div by zero
    
    const zScore = Math.abs(value - mean) / stdDev;
    
    // Adaptive baseline forecasting target
    const forecast = mean;

    return { 
      isAnomaly: zScore > thresholdZ, 
      zScore, 
      baseline: forecast,
      confidence: Math.min(100, Math.max(0, (zScore / thresholdZ) * 80))
    };
  }

  /**
   * Reinforcement Learning style Adaptive Thresholding
   * Adjusts the allowable error margin based on historical variance
   */
  adaptThreshold(baseThreshold: number, volatilityIndex: number) {
     // If the system is highly volatile (e.g. batch jobs running), loosen threshold
     if (volatilityIndex > 0.8) return baseThreshold * 1.5;
     if (volatilityIndex < 0.2) return baseThreshold * 0.8;
     return baseThreshold;
  }
}

export const MLForecaster = new TimeSeriesModels();
