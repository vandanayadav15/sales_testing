import { Body, Controller, Post } from '@nestjs/common';
import { AnyInput } from 'src/common/any.input';
import { StockItemService } from './stock_item.service';

@Controller('/stockItem')
export class StockItemController {
  constructor(private stockItemService: StockItemService) {}
  @Post('/search')
  async search(@Body() body: AnyInput) {
    try {
      let result = null;
      if (body.data && body.data.id) {
        result = await this.stockItemService.entity(body.data.id);
      } else {
        result = await this.stockItemService.search(body.data);
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
      result = await this.stockItemService.save(body.data);
      return { data: result };
    } catch (error) {
      return error;
    }
  }

  @Post('/update')
  async update(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.stockItemService.save(body.data);
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
        result = await this.stockItemService.delete(
          body.data ? body.data.id : '',
        );
        return { data: result };
      }
    } catch (error) {
      return error;
    }
  }
}
