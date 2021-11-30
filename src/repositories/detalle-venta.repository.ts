import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleVenta, DetalleVentaRelations} from '../models';

export class DetalleVentaRepository extends DefaultCrudRepository<
  DetalleVenta,
  typeof DetalleVenta.prototype.idDetalle,
  DetalleVentaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetalleVenta, dataSource);
  }
}
