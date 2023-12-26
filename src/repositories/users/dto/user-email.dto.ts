import { IsEmail } from 'class-validator';

export class UseEmailDto {
    @IsEmail()
    email: string;
}