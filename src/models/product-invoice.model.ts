import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductInvoice extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  unit_price: number;

  @property({
    type: 'number',
  })
  invoiceId?: number;

  @property({
    type: 'number',
  })
  productId?: number;

  constructor(data?: Partial<ProductInvoice>) {
    super(data);
  }
}

export interface ProductInvoiceRelations {
  // describe navigational properties here
}

export type ProductInvoiceWithRelations = ProductInvoice & ProductInvoiceRelations;
