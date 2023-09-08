import { User } from "./user";

export interface JwtResponce {
    user: User;

    jwtToken: string;
    
}