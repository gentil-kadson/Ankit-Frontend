import api from "./api";

type CreateUserData = {
  email: string;
  password1: string;
  password2: string;
};

type LoginData = {
  email: string;
  password: string;
}

export default class AuthService {
  private axiosClient = api;
  private baseURL = "/dj_rest_auth";

  async createUser(data: CreateUserData) {
    const url = `${this.baseURL}/registration/`;
    try {
      const response = await this.axiosClient.post(url, data);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async loginUser(data: LoginData) {
    try {
      const url = `${this.baseURL}/login/`;
      const response = await this.axiosClient.post(url, data);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
