/* eslint-disable prettier/prettier */
import { Min, Max, IsEmail, IsNotEmpty, MaxLength, MinLength, IsBoolean, IsFQDN } from 'class-validator'

export class PostDTO {
    @IsNotEmpty({ message: 'Le titre ne peut pas être vide !' })
    @MinLength(0, { message: 'Le titre est trop court !' })
    @MaxLength(50, { message: 'Le titre est trop long !' })
    title: string;

    @IsNotEmpty()
    @MinLength(30)
    content: string;

    @IsFQDN()
    picture: string;

    @Min(1)
    @Max(5)
    rank: string;

    @IsBoolean()
    enable: boolean;

}