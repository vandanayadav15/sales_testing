import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from 'src/common/App';
import { Props } from 'src/constants/Props';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { PurchaseItem } from '../purchase_item/purchase_item.entity';
import { PurchaseInvoice } from './purchase_invoice.entity';

@Injectable()
export class PurchaseInvoiceService {
  @InjectRepository(PurchaseInvoice)
  private purchaseInvoiceRepository: Repository<PurchaseInvoice>;
  constructor() {}
  async entity(id: any) {
    try {
      let query: any = { id: id };
      let data = await this.purchaseInvoiceRepository
        .createQueryBuilder('PurchaseInvoice')
        .leftJoinAndSelect('purchaseInvoice.purchaseItem', 'purchaseItem')
        .leftJoinAndSelect(
          'purchaseItem.purchaseItemListId',
          'purchaseItemList',
        )
        .getOne();
      return data ? data : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(item: any) {
    try {
      let query = item;
      // query.active = true;
      let data = await this.purchaseInvoiceRepository
        .createQueryBuilder('PurchaseInvoice')
        .leftJoinAndSelect('PurchaseInvoice.purchaseItem', 'purchaseItem')
        .leftJoinAndSelect(
          'purchaseItem.purchaseItemListId',
          'purchaseItemList',
        )
        .getMany();
      return data ? data : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Transaction()
  async save(
    item: any,
    @TransactionRepository(PurchaseInvoice)
    purchaseInvoiceRepository?: Repository<PurchaseInvoice>,
    @TransactionRepository(PurchaseItem)
    purchaseItemRepository?: Repository<PurchaseItem>,
  ) {
    try {
      await this.validate(item);
      console.log(item);
      let cloneData = { ...item };
      delete cloneData.purchaseItem;

      let result: any = await purchaseInvoiceRepository.save(cloneData);
      if (item.purchaseItem) {
        let purchaseItemResult: any = await purchaseItemRepository.save(
          item.purchaseItem,
        );
      }
      let returnData = { id: item.id, message: Props.SAVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: any) {
    try {
      let data = await this.purchaseInvoiceRepository.findOne(id);
      if (!data) throw { message: Props.RECORD_NOT_EXISTS };
      data.active = !data.active;

      let result: any = await this.purchaseInvoiceRepository.delete(id);
      let returnData = { id: data.id, message: Props.REMOVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: any) {
    let previousItem: any = null;
    if (!item.id || item.id.toString() == '' || item.id.toString() == '0') {
      item.id = null;
    } else {
      previousItem = await this.purchaseInvoiceRepository.findOne(item.id);
      if (previousItem) {
        item.id = previousItem.id;
      } else {
        throw { message: Props.RECORD_NOT_EXISTS };
      }
    }
    if (!item.id) {
      let uid = App.uuidv4();
      item.id = uid;
    }
    item.quantity = item.purchaseItem.length || 0;
    item.orderDate = new Date().toISOString();

    if (item.purchaseItem && item.purchaseItem.length > 0) {
      for (let ele of item.purchaseItem) {
        ele.id = App.uuidv4();
        ele.purchaseInvoiceId = item.id;
        // making item.id(purchase invoice table id) to item.purchaseInvoiceId( assigning)
        ele.totalAmount = ele.price * ele.quantity;
      }
    }
    item.totalAmount = item.purchaseItem.reduce(
      (acc, ele) => acc + ele.totalAmount,
      0,
    );
    console.log(item);
  }
}
