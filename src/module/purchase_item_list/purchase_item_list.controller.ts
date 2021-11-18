import { Body, Controller, Post } from '@nestjs/common';
import { AnyInput } from 'src/common/any.input';
import { PurchaseItemListService } from './purchase_item_list.service';

@Controller('/purchase_item_list')
export class PurchaseItemListController {
  constructor(private purchaseItemListService: PurchaseItemListService) {}
  @Post('/search')
  async search(@Body() body: AnyInput) {
    try {
      let result = null;
      if (body.data && body.data.id) {
        result = await this.purchaseItemListService.entity(body.data.id);
      } else {
        result = await this.purchaseItemListService.search(body.data);
      }
      return { data: result };
    } catch (error) {
      return { error: error };
    }
  }
  @Post('/save')
  async save(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.purchaseItemListService.save(body.data);
      return { data: result };
    } catch (error) {
      return error;
    }
  }

  @Post('/update')
  async update(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.purchaseItemListService.save(body.data);
      return { data: result };
    } catch (error) {
      return error;
    }
  }

  @Post('/delete')
  async delete(@Body() body: AnyInput) {
    try {
      let result = null;
      if (body.data && body.data.id) {
        result = await this.purchaseItemListService.delete(
          body.data ? body.data.id : '',
        );
        return { data: result };
      }
    } catch (error) {
      return error;
    }
  }
}
