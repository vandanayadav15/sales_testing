import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItemListController } from './purchase_item_list.controller';
import { PurchaseItemList } from './purchase_item_list.entity';
import { PurchaseItemListService } from './purchase_item_list.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItemList])],
  providers: [PurchaseItemListService],
  exports: [PurchaseItemListService],
  controllers: [PurchaseItemListController],
})
export class PurchaseItemListModule {}
