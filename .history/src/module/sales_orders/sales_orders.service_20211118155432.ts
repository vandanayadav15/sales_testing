import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from 'src/common/App';
import { Props } from 'src/constants/Props';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { SalesItems } from '../sales_items/sales_items.entity';
import { SalesOrders } from './sales_orders.entity';

@Injectable()
export class SalesOrdersService {
  @InjectRepository(SalesOrders)
  private salesOrdersRepository: Repository<SalesOrders>;
  constructor() {}

  async entity(id: any) {
    try {
      let query: any = { id: id };
      let data = await this.salesOrdersRepository
        .createQueryBuilder('SalesOrders')
        .leftJoinAndSelect('SalesOrders.salesItems', 'salesItems')
        .leftJoinAndSelect('salesItems.itemListId', 'itemsList')
        .getOne();
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async search(item: any) {
    try {
      let query = item;
      // query.active = true;
      let data = await this.salesOrdersRepository
        .createQueryBuilder('SalesOrders')
        .leftJoinAndSelect('SalesOrders.salesItems', 'salesItems')
        .leftJoinAndSelect('salesItems.itemListId', 'itemsList')
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
    @TransactionRepository(SalesOrders)
    salesOrdersRepository?: Repository<SalesOrders>,
    @TransactionRepository(SalesItems)
    salesItemsRepository?: Repository<SalesItems>,
  ) {
    try {
      await this.validate(item);
      //return "checking validation";
      console.log(item);
      let cloneData = { ...item };
      delete cloneData.salesItems;

      let result: any = await salesOrdersRepository.save(cloneData);
      if (item.salesItems) {
        let salesItemResult: any = await salesItemsRepository.save(
          item.salesItems,
        );
      }
      // let salesOrderData = await this.salesOrdersRepository.save(item);
      let returnData = { id: item.id, message: Props.SAVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any) {
    try {
      let data = await this.salesOrdersRepository.findOne(id);
      if (!data) throw { message: Props.RECORD_NOT_EXISTS };
      data.active = !data.active;

      let result: any = await this.salesOrdersRepository.delete(id);
      let returnData = { id: data.id, message: Props.REMOVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: any) {
    console.log(item, 'step 1');
    let previousItem: any = null;
    if (!item.id || item.id.toString() == '' || item.id.toString() == '0') {
      item.id = null;
    } else {
      previousItem = await this.salesOrdersRepository.findOne(item.id);
      if (previousItem) {
        item.id = previousItem.id;
      } else {
        throw { message: Props.RECORD_NOT_EXISTS };
      }
    }
    console.log(item, 'step 2');
    if (!item.id) {
      let uid = App.uuidv4();
      item.id = uid;
    }
    item.quantity = item.salesItems.length || 0;
    item.orderDate = new Date().toISOString();
    console.log(item, 'step 3');
    if (item.salesItems && item.salesItems.length > 0) {
      for (let ele of item.salesItems) {
        ele.id = App.uuidv4();
        ele.salesOrdersId = item.id;
        // making item.id(sale order table id) to item.salesOrdersId( assigning)
        ele.amount = ele.price * ele.quantity;
      }
    }
    item.amount = item.salesItems.reduce((acc, ele) => acc + ele.amount, 0);
    // console.log(item, "step 4");
  }
}
