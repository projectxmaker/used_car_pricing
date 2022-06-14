import {
    IsString,
    IsNumber,
    IsLatitude,
    IsLongitude,
    Min,
    Max
} from 'class-validator';

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(0)
    @Max(2050)
    year: number;

    @IsNumber()
    @IsLongitude()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}