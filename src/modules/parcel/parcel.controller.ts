import {
  Body,
  Controller,
  Post, Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { Request } from 'express';
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
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('tracking_no') tracking_no: string,
    @Body('order_no') order_no: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('phone_no') phone_no: string,
    @Body('weight') weight: number,
    @Body('rate') rate: number,
  ){
    try {
      const parcel = this.parcelService.create({
        user,
        date,
        time,
        tracking_no,
        order_no,
        name,
        address,
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

      const resp = await this.parcelService.parse(file.buffer);

      res.send(resp);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

}
