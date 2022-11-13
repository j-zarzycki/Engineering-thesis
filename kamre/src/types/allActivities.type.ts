import { RecommendationsType } from "@Types/recommendations.type";

type AllActivitiesType = {
  Aktywne: Array<RecommendationsType>;
  Bierne: Array<RecommendationsType>;
  "Pozytywne emocje": Array<RecommendationsType>;
  "Zmiana myślenia": Array<RecommendationsType>;
};

type IAllActivitiesResponse = {
  res: AllActivitiesType;
};

export type { IAllActivitiesResponse, AllActivitiesType };
