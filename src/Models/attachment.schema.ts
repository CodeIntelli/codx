import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
export type AttachmentDocument = Attachment & Document;
@Schema({ timestamps: true })
export class Attachment {
    @Prop()
    url: string;

    @Prop()
    location: string;

    @Prop()
    fileType: string;

    @Prop()
    key: string;

    @Prop()
    filename: string;

    @Prop()
    size: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}
export const AttachmentSchema = SchemaFactory.createForClass(Attachment);