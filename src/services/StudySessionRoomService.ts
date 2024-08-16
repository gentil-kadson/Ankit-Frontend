import api from "./api";

export type VocabularyBuilderObj = {
  language: number;
  name: string;
  topic: boolean;
  card_type: "basic" | "intermediate" | "advanced";
};

type ResponseCard = {
  front: string;
  back: string;
};

export default class StudySessionRoomService {
  private axiosClient = api;
  private authToken = "";
  private studySessionId = 0;

  constructor(authToken: string, studySessionId: number) {
    this.authToken = authToken;
    this.studySessionId = studySessionId;
  }

  async getVocabulary(
    data: VocabularyBuilderObj
  ): Promise<{ cards: ResponseCard[] }> {
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
      .then((response) => response)
      .catch((err) => err);
  }
}
