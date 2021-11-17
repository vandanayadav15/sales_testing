import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemListModule } from './module/item_list/item_list.module';
import { SalesItemsModule } from './module/sales_items/sales_items.module';
import { SalesOrdersModule } from './module/sales_orders/sales_orders.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
