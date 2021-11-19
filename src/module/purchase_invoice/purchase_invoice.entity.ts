import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PurchaseItem } from '../purchase_item/purchase_item.entity';

@Entity('purchase_invoice')
export class PurchaseInvoice {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'bill_to' })
  billTo: string;

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

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'active' })
  active: Boolean;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'updated_on' })
  updatedOn: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_on' })
  createdOn: Date;

  @OneToMany(
    (type) => PurchaseItem,
    (purchaseItem) => purchaseItem.purchaseInvoiceId,
  )
  purchaseItem: PurchaseItem;
}
