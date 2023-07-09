// import * as mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please Enter Your Name"],
//         maxLength: [30, "Name Cannot exceed 30 characters"],
//         minLength: [4, "Name Should have more than 4 characters"],
//     },
//     email: {
//         type: String,
//         required: [true, "Please Enter Your Email"],
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Please Enter Your Password"],
//         minLength: [4, "Password should not be greater than 4 characters"],
//         select: false,
//     },
//     // attachment: {
//     //     type: typeof mongoose.Schema.Types.ObjectId,
//     //     ref: "attachment",
//     //     required: true,
//     // },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     role: {
//         type: String,
//         default: "user",
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
// });

// export default UserSchema;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Attachment } from "./attachment.schema"
import Roles from 'src/Modules/user/enum/role.enum';
import { Exclude } from 'class-transformer';
export type userDocument = User & Document;
@Schema({ timestamps: true })
export class User {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    email: string;

    @Prop({ select: false })
    @Exclude()
    password: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isOnline: boolean;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({
        default: Roles.USER
    })
    role: Roles.USER;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpire: Date

}
export const UserSchema = SchemaFactory.createForClass(User);