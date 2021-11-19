import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemListModule } from './module/item_list/item_list.module';
import { SalesItemsModule } from './module/sales_items/sales_items.module';
import { SalesOrdersModule } from './module/sales_orders/sales_orders.module';
import { PurchaseInvoiceModule } from './module/purchase_invoice/purchase_invoice.module';
import { PurchaseItemModule } from './module/purchase_item/purchase_item.module';
import { StockItemModule } from './module/stock_item/stock_item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'testing',
      entities: [__dirname + '/../modules/**/*{entity.ts,entity.js}'],
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
    ItemListModule,
    SalesItemsModule,
    SalesOrdersModule,
    PurchaseInvoiceModule,
    PurchaseItemModule,
    StockItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
