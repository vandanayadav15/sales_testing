import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SalesItems } from '../sales_items/sales_items.entity';

@Entity('sales_orders')
export class SalesOrders {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'order_date' })
  orderDate: Date;

  @Column({ name: 'invoice_id' })
  invoiceId: string;

  @Column({ name: 'quantity' })
  quantity: string;

  @Column({ name: 'discount' })
  discount: string;

  @Column({ name: 'tax_amount' })
  taxAmount: number;

  @Column({ name: 'tax_percentage' })
  taxPercentage: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'updated_on' })
  updatedOn: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_on' })
  createdOn: Date;

  @OneToMany((type) => SalesItems, (salesItem) => salesItem.salesOrder)
  salesItems: SalesItems;
}
