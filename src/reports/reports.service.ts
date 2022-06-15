import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/users.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report> ){}

    async createEstimate({make, model, year, lng, lat, mileage}: Partial<GetEstimateDto>) {
        const query = await this.repo.createQueryBuilder()
            .select('AVG(price) price')
            .where("TRUE");

        query.andWhere('approved = 1');

        if (make) {
            query.andWhere('make = LOWER(:make)', {make});
        }

        if (model) {
            query.andWhere("model = LOWER(:model)", {model});
        }

        if (year) {
            query.andWhere("year - :year BETWEEN -3 AND +3", {year});
        }

        if (lng) {
            query.andWhere("lng - :lng BETWEEN -5 AND +5", {lng});
        }

        if (lat) {
            query.andWhere("lat - :lat BETWEEN -5 AND +5", {lat});
        }

        if (mileage) {
            query
                .andWhere("mileage - :mileage BETWEEN -1000 AND +1000", {mileage})
                .orderBy("mileage", "DESC");
        } else {
            query.orderBy("price", "DESC");
        }
        
        return query.getRawOne();
    }

    create(body: CreateReportDto, user: User) {
        const report = this.repo.create(body);
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({where:{id: parseInt(id)}});

        if (!report) {
            throw new NotFoundException('Report not found!');
        }
        
        report.approved = approved;

        return this.repo.save(report);
    }
}
