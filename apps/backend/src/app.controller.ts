import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: 'Get hello message' })
    @ApiResponse({
        status: 200,
        description: 'Returns hello message with environment info',
    })
    getHello(): { message: string; environment: string } {
        return this.appService.getHello();
    }
}
