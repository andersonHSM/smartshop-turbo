import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {CONFIG_NAMESPACE} from "./config/config.constants";

@Injectable()
export class AppService {
	constructor(private configService: ConfigService) {
	}

	getHello(): { message: string; environment: string } {
		const appConfig = this.configService.get(CONFIG_NAMESPACE.APP);
		return {
			message: 'Hello from NestJS API!',
			environment: appConfig.nodeEnv
		};
	}
}
