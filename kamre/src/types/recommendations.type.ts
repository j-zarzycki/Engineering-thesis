type RecommendationsType = {
  name: string;
  url: string;
};

interface IRecommendationsResponse {
  res: Array<RecommendationsType>;
}

export type { RecommendationsType, IRecommendationsResponse };
