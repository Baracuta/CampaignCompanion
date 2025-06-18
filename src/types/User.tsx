import { Campaign } from "./Campaign";

export interface User {
    id?: string;
    username: string;
    password: string;
    campaigns?: Array<Campaign>;
}