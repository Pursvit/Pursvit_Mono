import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "@app/users/users.service";
import * as argon from 'argon2';
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async hash(password: string): Promise<string> {
    return await argon.hash(password);
  }

  async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await argon.verify(passwordHash, password);
  }

  async register(registerInput: RegisterDto){
    const passwordHash = await this.hash(registerInput.password);

    return this.userService.createUser({
      email: registerInput.email,
      name: registerInput.name,
      passwordHash,
    });
  }

  async login(loginIn: LoginDto){
    const user = await this.userService.findUserByEmail(loginIn.email);
    if(!user) throw new UnauthorizedException(" Invalid Credentials");
    const isValid = await this.comparePassword(loginIn.password, user.passwordHash);
    if(!isValid) throw new UnauthorizedException(" Invalid credentials");

    // JWT Zone
    const payload = { sub: user._id, email: user.email};
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async getMe(user_id: string){
    const user = await this.userService.findUserByID(user_id);
    if(!user) throw new NotFoundException(" User Not Found");
    return user;
  }

  /*
  async changePassword(
    user_id: string,
    currPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findUserByID(user_id);
    if(!user) throw new NotFoundException(" User Not Found");
    if(!await this.comparePassword(currPassword, user.passwordHash)){
      throw new UnauthorizedException(" Invalid credentials");
    }

  }
  */

}
