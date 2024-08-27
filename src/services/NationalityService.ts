import api from "./api";

export type NationalityData = {
    id: number,
    name: string
}

export default class NationalityService {
    private axiosClient = api;
    private baseURL = "/nationalities";

    async getNationalities() {
        const url = `${this.baseURL}/`
        try {
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: ""
                }
            });
            return response
        } catch (error: any) {
            return error.response;
        }
    }
}