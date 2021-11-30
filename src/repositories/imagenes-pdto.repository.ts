import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ImagenesPdto, ImagenesPdtoRelations} from '../models';

export class ImagenesPdtoRepository extends DefaultCrudRepository<
  ImagenesPdto,
  typeof ImagenesPdto.prototype.idImagen,
  ImagenesPdtoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ImagenesPdto, dataSource);
  }
}
