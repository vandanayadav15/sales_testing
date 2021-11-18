import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItemListService } from '../purchase_item_list/purchase_item_list.service';
import { PurchaseItem } from './purchase_item.entity';
import { PurchaseItemService } from './purchase_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItem])],
  providers: [PurchaseItemService],
  exports: [PurchaseItemService],
})
export class PurchaseItemModule {}
