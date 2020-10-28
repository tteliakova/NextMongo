import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  HttpCode,
  Headers
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { Public } from './common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @ApiTags('Auth')
  @Post('login')
  @HttpCode(204)

  async login(
    @Res() response: Response,
    @Headers('auth') auth: string, 
    @Req() request: Request
  ) {
    const authHeader = request.header('Authorization');
    const { access_token } = await this.authService.login(auth || authHeader);
    const cookie = this.authService.getCookieWithJwtToken(access_token);
  
    response.setHeader('Set-Cookie', cookie);
    response.send(access_token);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Auth')
  @Post('logout')
  @HttpCode(204)
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(204);
  }
}
