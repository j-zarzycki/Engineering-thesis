type RecommendationsType = {
  name: string;
  url: string;
};

type IRecommendationsResponse = {
  res: Array<RecommendationsType>;
};

export type { IRecommendationsResponse, RecommendationsType };
