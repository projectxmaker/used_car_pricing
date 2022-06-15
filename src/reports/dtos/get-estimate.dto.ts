import {
    IsString,
    IsNumber,
    IsLatitude,
    IsLongitude,
    Min,
    Max
} from 'class-validator';

import { Transform } from 'class-transformer';

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(2050)
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lat: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}