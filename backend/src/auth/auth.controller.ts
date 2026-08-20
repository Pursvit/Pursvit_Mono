import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async register(@Body() registerDto:RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @Post()
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto);
    }

    @Get(':id')
    async getUser(@Param('id') id: string){
        return await this.authService.getMe(id);
    }

}