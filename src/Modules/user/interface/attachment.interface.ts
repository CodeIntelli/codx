import { Document } from "mongoose";

export interface AttachmentInterface extends Document {
    url: string;
    location: string;
    key: string;
    fileType: string;
    size: string;
    user: [string];
    filename: string;
    createdAt?: Date;
    updatedAt?: Date;
};

