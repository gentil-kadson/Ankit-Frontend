import api from "./api";

type CreateUserData = {
  email: string;
  password1: string;
  password2: string;
};

type LoginData = {
  email: string;
  password: string;
};

export type SocialAccount = {
  id: number;
  provider: string;
  uuid: string;
  last_login: string;
  date_joined: string;
};

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

  async loginUserByGoogle(code: string) {
    try {
      const url = `${this.baseURL}/google/`;
      const response = await this.axiosClient.post(url, { code: code });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async getUserSocialAccounts(authToken: string) {
    try {
      const url = `${this.baseURL}/socialaccounts/`;
      const response = await this.axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async disconnectUserFromGoogle(socialAccountId: number, authToken: string) {
    try {
      const url = `${this.baseURL}/socialaccount/${socialAccountId}/disconnect/`;
      const response = await this.axiosClient.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async connectUserToGoogle(code: string, authToken: string) {
    try {
      const url = `${this.baseURL}/google/connect/`;
      const response = await this.axiosClient.post(
        url,
        { code: code },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async resetPassword(email: string) {
    try {
      const url = `${this.baseURL}/password/reset/`;
      const response = await this.axiosClient.post(url, { email });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
