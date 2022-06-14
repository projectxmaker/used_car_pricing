import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    mileage: number;

    @Expose()
    price: number;

    @Expose()
    @Transform(({obj}) => obj.user.id)
    userId: number;
}