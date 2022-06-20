import { Controller, Post, Body, UseGuards, Param, Patch, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../../src/interceptors/serialize.interceptor';
import { ChangeApprovalDto } from './dtos/change-approval.dto';
import { AdminGuard } from '../../src/guards/admin.guards';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Get()
    getEstimate(@Query() query: Partial<GetEstimateDto>) {
        return this.reportsService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    changeApproval(@Param('id') id: string, @Body() body: ChangeApprovalDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
