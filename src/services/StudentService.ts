import api from "./api";

export type CreateStudentData = {
  first_name: string;
  last_name: string;
  educational_level: "Middle School" | "High School" | "University";
  nationality: number;
  profile_picture?: File;
};

export type UpdateStudentData = {
  first_name?: string;
  last_name?: string;
  educational_level?: "Middle School" | "High School" | "University";
  nationality?: number;
  profile_picture?: File;
};

export type Student = {
  id: number;
  first_name: string;
  last_name: string;
  educational_level: "Middle School" | "High School" | "University";
  streak: number;
  longest_streak: number;
  nationality: number;
  total_study_time: string;
  profile_picture: string;
  user: number;
};

export class StudentService {
  private axiosClient = api;
  private baseURL = "/students";
  private authToken = "";

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  async createStudent(data: CreateStudentData) {
    try {
      const url = `${this.baseURL}/`;
      const response = await this.axiosClient.post(url, data, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async updateStudent(data: UpdateStudentData, id: number) {
    try {
      const url = `${this.baseURL}/${id}/`;
      const response = await this.axiosClient.patch(url, data, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
