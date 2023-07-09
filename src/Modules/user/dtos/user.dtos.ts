import { Exclude, } from "class-transformer";
import { Equals, IsBoolean, IsDate, IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, equals, isEnum, registerDecorator } from "class-validator";
import Roles from "../enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";


export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} and ${args.property} don't match`;
    }
}
export class registerUserDtos {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(3)
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    @MinLength(3)
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 10)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;

    @IsString()
    @Match('password')
    confirmPassword: string;

    @ApiProperty({
        enum: Roles,
        isArray: true,
        example: [Roles.ADMIN, Roles.USER],
    })
    role?: Roles[];
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

export class changePasswordDTO {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 10)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    newPassword: string;

    @IsString()
    @Match('newPassword')
    confirmPassword: string;
}

export class resetPasswordDTO {
    @IsString()
    @IsNotEmpty()
    @Length(8, 10)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    newPassword: string;

    @IsString()
    @Match('newPassword')
    confirmPassword: string;

    @IsString()
    token: string
}   