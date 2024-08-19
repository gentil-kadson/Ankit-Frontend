import api from "./api";

export type StudySessionStats = {
  id: number;
  name: string;
  study_sessions_count: number;
  icon: string;
};

export type CardsAddedStats = {
  id: number;
  name: string;
  cards_added: number;
  icon: string;
};

export default class StatisticsService {
  private axiosClient = api;
  private authToken = "";

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  async getStudySessionsByLanguage(date_before?: string, date_after?: string) {
    try {
      const response = await this.axiosClient.get(
        "/study_sessions_by_language/",
        {
          params:
            date_after && date_before
              ? {
                  date_after,
                  date_before,
                }
              : {},
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );

      return response;
    } catch (e: any) {
      return e.response;
    }
  }

  async getCardsAddedByLanguage(date_before?: string, date_after?: string) {
    try {
      const response = await this.axiosClient.get("/cards_added_by_language", {
        params:
          date_after && date_before
            ? {
                date_after,
                date_before,
              }
            : {},
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });

      return response;
    } catch (e: any) {
      return e.response;
    }
  }
}
