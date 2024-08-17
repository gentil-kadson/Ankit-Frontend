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

  async getStudySessionsByLanguage() {
    try {
      const response = await this.axiosClient.get(
        "/study_sessions_by_language/",
        {
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

  async getCardsAddedByLanguage() {
    try {
      const response = await this.axiosClient.get("/cards_added_by_language", {
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
