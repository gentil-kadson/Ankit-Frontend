import api from "./api";

export type Language = {
    id: number;
    name: string;
}

export default class LanguageService {
    private axiosClient = api;
    private baseURL = '/languages';

    async getLanguages() {
        try {
            const url = `${this.baseURL}/`;
            const response = await this.axiosClient(url);
            return response;
        } catch (error: any) {
            return error.response;
        }
    }
}