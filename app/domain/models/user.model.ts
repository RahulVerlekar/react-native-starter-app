import { BaseModel } from "./common/base.model";

export class UserModel extends BaseModel {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    userType: UserType;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserType {
    USER = 'user',
    ADMIN = 'admin'
}