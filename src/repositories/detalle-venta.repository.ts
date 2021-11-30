import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleVenta, DetalleVentaRelations, Producto, Venta} from '../models';
import {ProductoRepository} from './producto.repository';
import {VentaRepository} from './venta.repository';

export class DetalleVentaRepository extends DefaultCrudRepository<
  DetalleVenta,
  typeof DetalleVenta.prototype.idDetalle,
  DetalleVentaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof DetalleVenta.prototype.idDetalle>;

  public readonly venta: HasOneRepositoryFactory<Venta, typeof DetalleVenta.prototype.idDetalle>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(DetalleVenta, dataSource);
    this.venta = this.createHasOneRepositoryFactoryFor('venta', ventaRepositoryGetter);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
