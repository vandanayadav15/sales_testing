import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesItems } from '../sales_items/sales_items.entity';
import { SalesItemsService } from '../sales_items/sales_items.service';
import { SalesOrdersController } from './sales_orders.controller';
import { SalesOrders } from './sales_orders.entity';
import { SalesOrdersService } from './sales_orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrders, SalesItems])],
  providers: [SalesOrdersService, SalesItemsService],
  exports: [SalesOrdersService],
  controllers: [SalesOrdersController],
})
export class SalesOrdersModule {}
