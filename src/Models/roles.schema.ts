// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import mongoose from 'mongoose';
// export type permissionDocument = Roles & Document;
// // import { Permission } from './permission.schema';


// Schema({ timestamps: true })
// export class Roles {
//     @Prop({ required: true, unique: true })
//     Roles_name: string

//     @Prop({
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Permission',
//     })
//     permissions: String

//     @Prop({ default: true })
//     isActive: boolean;
// }


// export const RolesSchema = SchemaFactory.createForClass(Roles);


import * as mongoose from 'mongoose';

const RolesSchema = new mongoose.Schema({
    roles_name: {
        type: String,
        required: true,
        trim: true,
    },
    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
    }, isActive: {
        type: Boolean,
        default: true,
    }
})

export default RolesSchema;
