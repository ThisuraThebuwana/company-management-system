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
import { BlogService } from './blog.service';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Controller('api/blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private jwtService: JwtService
  ) {}

  @Post('create')
  async create(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('length') length: number,
  ){
    const blog = this.blogService.create({
      id,
      name,
      length
    });

    return blog;
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

      // const stream = fs.createReadStream('src/assets/my_csv.csv');

      const resp = await this.blogService.parse(file.buffer);
      // const resp = await this.blogService.parse(stream);

      res.send(resp);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

}
