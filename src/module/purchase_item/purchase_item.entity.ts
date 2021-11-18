import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PurchaseInvoice } from '../purchase_invoice/purchase_invoice.entity';

@Entity('purchase_item')
export class PurchaseItem {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'quantity' })
  quantity: string;

  @Column({ name: 'tax_percentage' })
  taxPercentage: number;

  @Column({ name: 'tax_amount' })
  taxAmount: string;

  @Column({ name: 'amount' })
  amount: number;

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

  @JoinColumn({ name: 'purchase_invoice_id' })
  @ManyToOne((type) => PurchaseInvoice)
  purchaseInvoice: PurchaseInvoice;
}
