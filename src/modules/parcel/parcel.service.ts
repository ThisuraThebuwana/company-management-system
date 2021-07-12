import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcel } from '../../shared/entities/parcel.entity';
import { CsvParser } from 'nest-csv-parser';
import { ParcelRepository } from '../../shared/repositories/parcel.repository';

@Injectable()
export class ParcelService {
  NO_OF_COLUMNS = 7;

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

  async findOne(condition: any): Promise<Parcel> {
    return this.parcelRepository.findOne(condition);
  }

  async find(condition: any): Promise<Parcel[]> {
    return this.parcelRepository.find(condition);
  }

  async checkTrackingNoAvailability (tracking_no: string) : Promise<any> {
    try {
      const parcel = await this.findOne({tracking_no});
      if(!parcel) {
        return null;
      }
      else{
        return parcel;
      }
    }catch (e) {
      console.log(e);
    }
  }

  async parse(stream: any, user_id: string): Promise<any> {
    try {
      let results;
      let error = '';
      let errorNullRows=[];
      let duplicatedTrckNo=[];

      const allText = stream.toString();
      const allTextLines = allText.split(/\r\n|\n/);

      // const headers = allTextLines[0].split(',');

      for (let i = 1; i < allTextLines.length; i++) {
        if(allTextLines[i] != '' || allTextLines[i] != null){
          let data = allTextLines[i].split(',');
          if(data.length == this.NO_OF_COLUMNS) {

            if(data[0]=='' || data[1]=='' ||data[2]=='' || data[3]=='' ||data[4]=='' || data[5]=='' ||data[6]==''){

              if(data[0]==''){
                error = 'There is a row with empty Tracking number.';
              }else{
                errorNullRows.push(data[0]);
              }
            }else{
              const availableParcel = await this.checkTrackingNoAvailability(data[0]);
              if(!availableParcel){
                results = this.create({
                  user:user_id,
                  datetime:Date(),
                  tracking_no:data[0],
                  order_no:data[1],
                  name:data[2],
                  address:data[3],
                  city:data[4],
                  phone_no:data[5],
                  weight:data[6],
                  rate:null,
                });
              }else{
                duplicatedTrckNo.push(data[0]);
              }
            }
          }else if(data.length > 1){
            error = 'Invalid table structure.';
          }
        }
      }

      if(errorNullRows.length>0){
        error = 'There are null values in following Tracking numbers:'+errorNullRows;
      }

      if(duplicatedTrckNo.length>0){
        error = 'There are duplicated tracking numbers:'+duplicatedTrckNo;
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
