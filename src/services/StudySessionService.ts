import api from "./api";

export type StudySessionQueryParams = {
  language: number;
  name: string;
  page: number;
};

export type StudySession = {
  id: number;
  duration_in_minutes: string;
  cards_added: number;
  csv_file: string;
  name: string;
  language: { id: number; name: string };
};

export default class StudySessionService {
  private axiosClient = api;
  private baseURL = "/study_sessions";
  private authToken = "";

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  async getStudySessionName(id: number) {
    try {
      const { data } = await this.axiosClient.get(`${this.baseURL}/${id}/`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });

      return data.name;
    } catch (e: any) {
      return e.response;
    }
  }

  async getStudySessionLanguageId(sessionId: number): Promise<number> {
    return await this.axiosClient
      .get(`${this.baseURL}/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      })
      .then((response) => response.data.language.id);
  }

  getDisplayDuration(studySession: StudySession) {
    const duration = Number(studySession.duration_in_minutes.split(":")[1]);
    const roundDuration = Math.ceil(duration);
    return roundDuration.toString();
  }

  async getStudySessions(query_params: Partial<StudySessionQueryParams> = {}) {
    try {
      const url = `${this.baseURL}/`;
      const response = await this.axiosClient.get(url, {
        params: { ...query_params },
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async delete(id: number) {
    try {
      const url = `${this.baseURL}/${id}/`;
      const response = await this.axiosClient.delete(url, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
