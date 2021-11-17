import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesItems } from './sales_items.entity';
import { SalesItemsService } from './sales_items.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesItems])],
  providers: [SalesItemsService],
  exports: [SalesItemsService],
})
export class SalesItemsModule {}
