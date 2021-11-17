import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from 'src/common/App';
import { Props } from 'src/constants/Props';
import { Repository } from 'typeorm';
import { SalesItems } from './sales_items.entity';

@Injectable()
export class SalesItemsService {
  @InjectRepository(SalesItems)
  private salesItemsRepository: Repository<SalesItems>;
  constructor() {}

  async entity(id: any) {
    try {
      let query: any = { id: id, active: true };
      let data: any = await this.salesItemsRepository.findOne(query, {
        relations: [],
      });
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async search(item: any) {
    try {
      let query = item;
      query.active = true;
      let data = await this.salesItemsRepository.find({
        relations: [],
        where: query,
      });
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async save(item: SalesItems) {
    try {
      await this.validate(item);
      let salesItemsData = await this.salesItemsRepository.save(item);
      let returnData = { id: item.id, message: Props.SAVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any) {
    try {
      let data: any = await this.salesItemsRepository.findOne(id);
      if (!data) throw { message: Props.RECORD_NOT_EXISTS };
      data.active = !data.active;

      let result: any = await this.salesItemsRepository.save(data);
      let returnData = { id: id, message: Props.REMOVED_SUCCESSFULLY };
      return returnData;
    } catch (error) {
      throw error;
    }
  }

  async validate(item: SalesItems) {
    let previousItem: any = null;
    if (!item.id || item.id.toString() == '' || item.id.toString() == '0') {
      item.id = null;
    } else {
      previousItem = await this.salesItemsRepository.findOne(item.id);
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
