import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(name: string, pass: string): Promise<any> {
    const user = await this.usersService.get({ email: name })
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.email }

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }
}
