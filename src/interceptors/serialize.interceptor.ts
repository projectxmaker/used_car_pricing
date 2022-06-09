import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToInstance } from "class-transformer";
import { plainToClass } from "class-transformer";
export function Serialize(dto:any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){};

    intercept(context: ExecutionContext, next: CallHandler):any {
        return next.handle().pipe(
            map((data:any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        )
    }
}