import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ImagenesPdto, ImagenesPdtoRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ImagenesPdtoRepository extends DefaultCrudRepository<
  ImagenesPdto,
  typeof ImagenesPdto.prototype.idImagen,
  ImagenesPdtoRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof ImagenesPdto.prototype.idImagen>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(ImagenesPdto, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
