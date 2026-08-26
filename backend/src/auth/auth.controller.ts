<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { FindUserId } from "@app/users/dto/findUserId.dto";

@Controller("auth")
=======
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("Auth")
>>>>>>> 999f5ba5b8a22cb1838871b18467771ba59d8bed
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

<<<<<<< HEAD
  @UseGuards(LocalAuthGuard)
=======
>>>>>>> 999f5ba5b8a22cb1838871b18467771ba59d8bed
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

<<<<<<< HEAD
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getUser(@Param("id") id: FindUserId) {
=======
  @Get(":id")
  async getUser(@Param("id") id: string) {
>>>>>>> 999f5ba5b8a22cb1838871b18467771ba59d8bed
    return await this.authService.getMe(id);
  }
}
