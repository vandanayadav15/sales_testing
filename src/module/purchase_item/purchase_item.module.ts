import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItem } from './purchase_item.entity';
import { PurchaseItemService } from './purchase_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItem])],
  providers: [PurchaseItemService],
  exports: [PurchaseItemService],
})
export class PurchaseItemModule {}
