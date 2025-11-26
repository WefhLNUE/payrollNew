import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(@Body() dto: RegisterDto) {
//     return this.authService.register(dto);
//   }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const user = await this.authService.validateEmployee(
            dto.workEmail,
            dto.password,
        );

        if (!user) throw new UnauthorizedException('Invalid credentials');

        const { accessToken } = await this.authService.login(user);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false, // true in production (HTTPS)
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        return { message: 'Logged in successfully' };
    }


  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    return res.send({ logout: true });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Res() res: Response, @Body() body) {
    return res.send(res.req.user);
  }
}
