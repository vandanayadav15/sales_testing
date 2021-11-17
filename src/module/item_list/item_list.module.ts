import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemListController } from './item_list.controller';
import { ItemList } from './item_list.entity';
import { ItemListService } from './item_list.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemList])],
  providers: [ItemListService],
  exports: [ItemListService],
  controllers: [ItemListController],
})
export class ItemListModule {}
