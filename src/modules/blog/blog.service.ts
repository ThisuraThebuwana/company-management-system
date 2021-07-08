import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../../shared/entities/blog.entity';
import { BlogRepository } from '../../shared/repositories/blog.repository';
import { CsvParser } from 'nest-csv-parser';

@Injectable()
export class BlogService {
  NO_OF_COLUMNS = 3;

  constructor(
    @InjectRepository (Blog) private readonly blogRepository: BlogRepository,
    private readonly csvParser: CsvParser,
  ){}

  async create(data: any): Promise<Blog> {
    return this.blogRepository.save(data);
  }

  async parse(stream: any): Promise<any> {
    try {
      let results;
      let error = '';
      let errorRows=[];

      const allText = stream.toString();
      const allTextLines = allText.split(/\r\n|\n/);

      // const headers = allTextLines[0].split(',');

      for (let i = 1; i < allTextLines.length; i++) {
        if(allTextLines[i] != '' || allTextLines[i] != null){
          let data = allTextLines[i].split(',');
          if(data.length == this.NO_OF_COLUMNS) {

            if(data[0]=='' || data[1]=='' ||data[2]==''){
              if(data[0]==''){
                error = 'A row with empty id.';
              }else{
                errorRows.push(data[0]);
              }
            }else{
              results = this.create({id:data[0], name:data[1], length:data[2]});
            }
          }else if(data.length > 1){
            error = 'Invalid table structure.';
          }
        }
      }

      // const str = createReadStream(stream);
      //
      // console.log("str : ", str);
      // // console.log("str : ", stream);
      //
      // const entities: any = await this.csvParser.parse(
      //   str,
      //   Blog
      // );
      //
      // console.log(entities);
      //
      // return entities;
      if(errorRows.length>0){
        error = 'There are null values in following row ids : '+errorRows;
      }

      if(error){
        console.log(error);
        return {
          'error': error,
        };
      }

      return {
        'message': 'Successful',
      };
    } catch (e) {
      console.log(e);
    }
  }
}
