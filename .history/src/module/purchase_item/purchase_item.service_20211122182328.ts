import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '../../common/App';
import { Props } from '../../constants/Props';
import { Repository } from 'typeorm';
import { PurchaseItem } from './purchase_item.entity';

@Injectable()
export class PurchaseItemService {
  @InjectRepository(PurchaseItem)
  private purchaseItemRepository: Repository<PurchaseItem>;
  constructor() {}

  async entity(id: any) {
    try {
      let query: any = { id: id, active: true };
      let data: any = await this.purchaseItemRepository.findOne(query, {
        relations: [],
      });
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async search(item: any) {
    try {
      let query: any = { item: item, active: true };
      let data: any = await this.purchaseItemRepository.find({
        relations: [],
        where: query,
      });
    } catch (error) {
      throw error;
    }
  }
  async save(item: any) {
    try {
      let purchaseOrdersDate = await this.purchaseItemRepository.save(item);
      let returnData = { id: item.id, message: Props.SAVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any) {
    try {
      let data: any = await this.purchaseItemRepository.findOne(id);
      if (!data) throw { message: Props.RECORD_NOT_EXISTS };
      data.active = !data.active;

      let result: any = await this.purchaseItemRepository.save(data);
      let returnData = { id: id, message: Props.REMOVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: PurchaseItem) {
    let previousItem: any = null;
    if (!item.id || item.id.toString() == '' || item.id.toString() == '0') {
      item.id = null;
    } else {
      previousItem = await this.purchaseItemRepository.findOne(item.id);
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
  }
}
