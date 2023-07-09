import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
export type permissionDocument = Roles & Document;
import { Permission } from './permission.schema';


Schema({ timestamps: true })
export class Roles {
    @Prop({ required: true, unique: true })
    Roles_name: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
    })
    permissions: Permission

    @Prop({ default: true })
    isActive: boolean;
}


export const RolesSchema = SchemaFactory.createForClass(Roles);