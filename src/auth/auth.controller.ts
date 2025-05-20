import { Controller, Post, Body, UseGuards, Get, Req, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './public.decorator'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    try {
      const user = await this.usersService.get({ email: signInDto.email })
      if (!user) {
        throw new UnauthorizedException('Invalid credentials')
      }
      return this.authService.signIn(signInDto.email, signInDto.password)
    } catch (error) {
      console.error('🔴 Error signing in:', error)
      throw error
    }
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return this.authService.register(registerDto.name, registerDto.email, registerDto.password)
    } catch (error) {
      console.error('🔴 Error registering user:', error)
      if (error.name === 'PrismaClientValidationError') {
        throw new BadRequestException('Missing or invalid fields in registration data')
      }
      throw error
    }
  }
}
