import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ItemList } from '../item_list/item_list.entity';
import { SalesOrders } from '../sales_orders/sales_orders.entity';

@Entity('sales_items')
export class SalesItems {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'quantity' })
  quantity: string;

  @Column({ name: 'discount' })
  discount: string;

  @Column({ name: 'tax_percentage' })
  taxPercentage: number;

  @Column({ name: 'tax_amount' })
  taxAmount: number;

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

  @JoinColumn({ name: 'item_list_id' })
  @ManyToOne((type) => ItemList)
  itemListId: ItemList;

  @JoinColumn({ name: 'sales_orders_id' })
  @ManyToOne((type) => SalesOrders)
  salesOrder: SalesOrders;
}
