import api from "./api";

export type CreateStudentData = {
    first_name: string,
    last_name: string,
    educational_level: "Middle School" | "High School" | "University",
    nationality: number
}

export class StudentService {
    private axiosClient = api;
    private baseURL = '/students';
    private authToken = '';

    constructor(authToken: string) {
        this.authToken = authToken;
    }

    async createStudent(data: CreateStudentData) {
        try {
            const url = `${this.baseURL}/`;
            const response = await this.axiosClient.post(url, data, {
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