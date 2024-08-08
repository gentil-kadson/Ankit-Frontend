import { Axios, AxiosError } from "axios";
import api from "./api";

type CreateUserData = {
  email: string;
  password1: string;
  password2: string;
};

export default class AuthService {
  private axiosClient = api;
  private basePath = "/dj_rest_auth";

  async createUser(data: CreateUserData) {
    const url = `${this.basePath}/registration/`;
    try {
      const response = await this.axiosClient.post(url, data);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
