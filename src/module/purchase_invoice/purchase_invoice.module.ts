import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItem } from '../purchase_item/purchase_item.entity';
import { PurchaseItemService } from '../purchase_item/purchase_item.service';
import { PurchaseInvoiceController } from './purchase_invoice.controller';
import { PurchaseInvoice } from './purchase_invoice.entity';
import { PurchaseInvoiceService } from './purchase_invoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseInvoice, PurchaseItem])],
  providers: [PurchaseInvoiceService, PurchaseItemService],
  exports: [PurchaseInvoiceService],
  controllers: [PurchaseInvoiceController],
})
export class PurchaseInvoiceModule {}
