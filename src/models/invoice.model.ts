import {Entity, model, property} from '@loopback/repository';

@model()
export class Invoice extends Entity {
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
  invoice_number: number;

  @property({
    type: 'date',
    required: true,
  })
  invoice_date: string;

  @property({
    type: 'string',
  })
  invoice_time?: string;


  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
