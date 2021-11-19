import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('stock_item')
export class StockItem {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'brand' })
  brand: string;

  @Column({ name: 'default_price' })
  defaultPrice: string;

  @Column({ name: 'description' })
  description: string;

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
}
