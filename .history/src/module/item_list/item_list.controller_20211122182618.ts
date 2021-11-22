import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { AnyInput } from '../../common/any.input';
import { ItemListService } from './item_list.service';

@Controller('/itemL_list')
export class ItemListController {
  constructor(private itemListService: ItemListService) {}
  @Post('/search')
  async search(@Body() body: AnyInput) {
    try {
      let result = null;
      if (body.data && body.data.id) {
        result = await this.itemListService.entity(body.data.id);
      } else {
        result = await this.itemListService.search(body.data);
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
      result = await this.itemListService.save(body.data);
      return { data: result };
    } catch (error) {
      return { error: error };
    }
  }

  @Put('/update')
  async update(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.itemListService.save(body.data);
      return { data: result };
    } catch (error) {
      return { error: error };
    }
  }

  @Delete('/delete')
  async delete(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.itemListService.delete(body.data ? body.data.id : '');
      return { data: result };
    } catch (error) {
      console.error(error);
      return { error: error };
    }
  }
}
