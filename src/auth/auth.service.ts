import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }): Promise<any> {
    console.log(username, 'username validateUser');
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: string) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public getCookieWithJwtToken(token: string) {
    return `auth=${token}; HttpOnly; Path=/; Max-Age=600`;
  }

  public getCookieForLogOut() {
    return `auth=; HttpOnly; Path=/; Max-Age=0`;
  }
}
