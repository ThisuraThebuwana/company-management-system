import { EntityRepository, Repository } from 'typeorm';
import { Parcel } from '../entities/parcel.entity';


@EntityRepository(Parcel)
export class ParcelRepository extends Repository<Parcel>{

}
