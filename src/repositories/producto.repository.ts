import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, DetalleVenta, Categoria, ImagenesPdto} from '../models';
import {DetalleVentaRepository} from './detalle-venta.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImagenesPdtoRepository} from './imagenes-pdto.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idProducto,
  ProductoRelations
> {

  public readonly detalleVenta: BelongsToAccessor<DetalleVenta, typeof Producto.prototype.idProducto>;

  public readonly categoria: BelongsToAccessor<Categoria, typeof Producto.prototype.idProducto>;

  public readonly imagenesPdtos: HasManyRepositoryFactory<ImagenesPdto, typeof Producto.prototype.idProducto>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetalleVentaRepository') protected detalleVentaRepositoryGetter: Getter<DetalleVentaRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImagenesPdtoRepository') protected imagenesPdtoRepositoryGetter: Getter<ImagenesPdtoRepository>,
  ) {
    super(Producto, dataSource);
    this.imagenesPdtos = this.createHasManyRepositoryFactoryFor('imagenesPdtos', imagenesPdtoRepositoryGetter,);
    this.registerInclusionResolver('imagenesPdtos', this.imagenesPdtos.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
    this.detalleVenta = this.createBelongsToAccessorFor('detalleVenta', detalleVentaRepositoryGetter,);
    this.registerInclusionResolver('detalleVenta', this.detalleVenta.inclusionResolver);
  }
}
