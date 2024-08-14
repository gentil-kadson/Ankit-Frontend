import api from "./api";

type Language = {
  id: number;
  name: string;
  icon: string | null;
};

export type VocabularyBuilderObj = {
  language: Language;
  name: string;
  topic: boolean;
  card_type: "basic" | "intermediate" | "advanced";
};

export default class StudySessionService {
  private axiosClient = api;
  private authToken = "";
  private studySessionId = 0;

  constructor(authToken: string, studySessionId: number) {
    this.authToken = authToken;
    this.studySessionId = studySessionId;
  }

  async getVocabulary(data: VocabularyBuilderObj) {
    const { data: cards } = await this.axiosClient.post(
      "/vocabulary_builder/",
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      }
    );

    return cards;
  }

  async finishStudySession() {
    await this.axiosClient
      .post(
        `/study_sessions/${this.studySessionId}/finish/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((err) => err);
  }
}
