import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type permissionDocument = Permission & Document;


Schema({ timestamps: true })
export class Permission {
    @Prop({ required: true, unique: true })
    permission_name: string;

    @Prop({ default: true })
    isActive: boolean;
}


export const PermissionSchema = SchemaFactory.createForClass(Permission);