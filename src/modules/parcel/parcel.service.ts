import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcel } from '../../shared/entities/parcel.entity';
import { CsvParser } from 'nest-csv-parser';
import { ParcelRepository } from '../../shared/repositories/parcel.repository';

@Injectable()
export class ParcelService {
  NO_OF_COLUMNS = 10;

  constructor(
    @InjectRepository (Parcel) private readonly parcelRepository: ParcelRepository,
    private readonly csvParser: CsvParser,
  ){}

  async create(data: any): Promise<Parcel> {
    try {
      return this.parcelRepository.save(data);
    }catch (e) {
      console.log(e);
    }
  }

  async parse(stream: any): Promise<any> {
    try {
      let results;
      let error = '';
      let errorNullRows=[];

      const allText = stream.toString();
      const allTextLines = allText.split(/\r\n|\n/);

      // const headers = allTextLines[0].split(',');

      for (let i = 1; i < allTextLines.length; i++) {
        if(allTextLines[i] != '' || allTextLines[i] != null){
          let data = allTextLines[i].split(',');
          if(data.length == this.NO_OF_COLUMNS) {

            if(data[0]=='' || data[1]=='' ||data[2]=='' || data[3]=='' ||data[4]=='' || data[5]=='' ||data[6]=='' || data[7]=='' ||data[8]=='' ||data[9]==''){

              if(data[3]==''){
                error = 'There is a row with empty Tracking number.';
              }else{
                errorNullRows.push(data[3]);
              }
            }else{
              results = this.create({
                user:data[0],
                date:data[1],
                time:data[2],
                tracking_no:data[3],
                order_no:data[4],
                name:data[5],
                address:data[6],
                phone_no:data[7],
                weight:data[8],
                rate:data[9],
              });
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
      if(errorNullRows.length>0){
        error = 'There are null values in following Tracking numbers:'+errorNullRows;
      }

      if(error){
        console.log(error);
        return {
          'error': error,
        };
      }

      return {
        message: "success"
      };
    } catch (e) {
      console.log(e);

    }
  }
}
