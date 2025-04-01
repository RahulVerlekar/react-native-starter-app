export function sentimentScore(key: string): number {
  
    const positiveEmotions: string[] = [
      "happiness", "joy", "trust", "excitement", "confidence", "motivation",
      "fulfillment", "positivity", "calmness", "relief", "gratitude", "love",
      "optimism", "contentment", "peace", "enthusiasm", "hope", "inspiration",
      "delight", "amusement", "pride", "satisfaction", "eagerness", "appreciation",
      "bliss", "cheerfulness", "ecstasy", "euphoria", "interest", "kindness"
    ];
    const negativeEmotions: string[] = [
      "anger", "fear", "sadness", "disgust", "frustration", "helplessness",
      "anxiety", "self-doubt", "self-blame", "uncertainty", "overwhelm", "apprehension",
      "worry", "stress", "resentment", "envy", "jealousy", "guilt", "shame",
      "disappointment", "despair", "pessimism", "irritation", "agitation",
      "bitterness", "cynicism", "dread", "loneliness", "melancholy", "panic", "remorse"
    ];
    const neutralEmotions: string[] = [
      "surprise", "curiosity", "self-awareness", "energy", "neutral", "indifference",
      "ambivalence", "apathy", "boredom", "confusion", "disinterest", "numbness", "pensiveness", "reflection"
    ];

    if (positiveEmotions.includes(key)) {
      return 1;
    } else if (negativeEmotions.includes(key)) {
      return -1;
    } else if (neutralEmotions.includes(key)) {
      return 0;
    }
    return 0; // Default case if the emotion is not recognized

  }