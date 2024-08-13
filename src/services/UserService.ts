import api from "./api"

import { Student } from "./StudentService";

export type User = {
    id: string,
    email: string,
    student: Student
}

export default class UserService {
    private axiosClient = api;
    private baseURL = "/users";
    private authToken = "";

    constructor(authToken: string) {
        this.authToken = authToken;
    }

    async getMe() {
        try {
            const url = `${this.baseURL}/me/`;
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    async delete(id: string) { // Because someone typed the id string in the AuthContext
        try {
            const url = `${this.baseURL}/${id}/`;
            const response = await this.axiosClient.delete(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    }
}