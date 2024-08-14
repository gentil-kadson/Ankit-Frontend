import api from "./api";

export type StudySessionQueryParams = {
  language: number;
  name: string;
};

export type StudySession = {
  id: number;
  duration_in_minutes: string;
  cards_added: number;
  csv_file: string;
  name: string;
  language: string;
};

export default class StudySessionService {
  private axiosClient = api;
  private baseURL = "/study_sessions";
  private authToken = "";

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  getDisplayDuration(studySession: StudySession) {
    const duration = Number(studySession.duration_in_minutes.split(":")[2]);
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
}
