import { IsBoolean } from "class-validator";

export class ChangeApprovalDto {
    @IsBoolean()
    approved: boolean;
}