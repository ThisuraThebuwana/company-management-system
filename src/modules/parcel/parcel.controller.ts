import {
  Body,
  Controller, Get,
  Post, Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ParcelService } from './parcel.service';


@Controller('api/parcel')
export class ParcelController {
  constructor(
    private readonly parcelService: ParcelService,
    private jwtService: JwtService
  ) {}

  @Post('create')
  async create(
    @Body('user') user: string,
    @Body('datetime') datetime: string,
    @Body('tracking_no') tracking_no: string,
    @Body('order_no') order_no: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('city') city: string,
    @Body('phone_no') phone_no: string,
    @Body('weight') weight: number,
    @Body('rate') rate: number,
  ){
    try {
      const parcel = this.parcelService.create({
        user,
        datetime,
        tracking_no,
        order_no,
        name,
        address,
        city,
        phone_no,
        weight,
        rate,
      });

      return parcel;
    }catch (e) {
      console.log(e);
    }

  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: any, @Req() request: Request, @Res() res){
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if(!data) {
        throw new UnauthorizedException();
      }

      const resp = await this.parcelService.parse(file.buffer, data['user_id']);

      res.send(resp);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('parcels')
  async findParcels(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if(!data) {
        throw new UnauthorizedException();
      }

      const parcels = await this.parcelService.find({user: data['user_id']});

      // const {password, ...result} = user;

      return parcels;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('all-parcels')
  async findAllParcels(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if(!data) {
        throw new UnauthorizedException();
      }
      const userID = data['user_id'];
      let parcels;
      if(userID.toString().charAt(0) === 'A'){
        parcels = await this.parcelService.find({});
      }else{
        throw new UnauthorizedException();
      }

      // const {password, ...result} = user;

      return parcels;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
