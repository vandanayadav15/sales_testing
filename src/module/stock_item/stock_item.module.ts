import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockItemController } from './stock_item.controller';
import { StockItem } from './stock_item.entity';
import { StockItemService } from './stock_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockItem])],
  providers: [StockItemService],
  exports: [StockItemService],
  controllers: [StockItemController],
})
export class StockItemModule {}
