import { Role } from "./role";

export interface User {
    id: number;
    email: string;
    firstName:string;
    lastName: string; 
    password: string;
    matchingPassword: string; 
    enabled: boolean;
    roles: [Role];
}