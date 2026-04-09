import {IsIn, IsString,MinLength} from 'class-validator';

export class CreateProjectDto{
    @IsString()
    @MinLength(1)
    title!: string;

    @IsString()
    @IsIn(['idea','building','deployed','paused'])
    status!: string;

}