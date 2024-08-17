import api from "./api";

export type StudySessionStats = {
  id: number;
  name: string;
  study_sessions_count: number;
};

export type CardsAddedStats = {
  id: number;
  name: string;
  cards_added: number;
};

export default class StatisticsService {
  private axiosClient = api;
  private authToken = "";

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  async getStudySessionsByLanguage(
    history_date_before?: string,
    history_date_after?: string
  ) {
    try {
      const response = await this.axiosClient.get(
        "/study_sessions_by_language/",
        {
          params:
            history_date_after && history_date_before
              ? {
                  history_date_after,
                  history_date_before,
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

  async getCardsAddedByLanguage(
    history_date_before?: string,
    history_date_after?: string
  ) {
    try {
      const response = await this.axiosClient.get("/cards_added_by_language", {
        params:
          history_date_after && history_date_before
            ? {
                history_date_after,
                history_date_before,
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
