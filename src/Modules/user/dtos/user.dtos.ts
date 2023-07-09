import { Exclude } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class registerUserDtos {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
};


export class CheckMongoID {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string
}

export class checkLoginUserData {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}