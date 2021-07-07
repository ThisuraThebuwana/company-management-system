import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ){
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.userService.create({
      name,
      email,
      password: hashedPassword
    });

    user.then(value => {delete value.password});

    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ){
    const user = await this. userService.findOne({email});

    if(!user) {
      throw new BadRequestException('invalid credentials');
    }

    if(!await bcrypt.compare(password, user.password)){
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({id: user.id});

    response.cookie('jwt', jwt, {httpOnly: true});

    return {
      message: 'success'
    };
  }

  @Get('logout')
  async logout(@Res({passthrough: true}) response: Response){
    response.cookie('jwt', null, {httpOnly: true});
    return {
      message: 'success'
    }
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if(!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne({id: data['id']});

      const {password, ...result} = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
