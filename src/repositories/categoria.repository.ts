import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, CategoriaRelations} from '../models';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.idCategoria,
  CategoriaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Categoria, dataSource);
  }
}
