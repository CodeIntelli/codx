import { Document } from "mongoose";

export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    role?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    access_token?: string;
};

import { Request } from "express"
export interface RequestInterface extends Request {
    user: any // or any other type
}

