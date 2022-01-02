import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CustomerUser, CustomerUserRelations} from '../models';

export class CustomerUserRepository extends DefaultCrudRepository<
  CustomerUser,
  typeof CustomerUser.prototype.id,
  CustomerUserRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CustomerUser, dataSource);
  }
}
