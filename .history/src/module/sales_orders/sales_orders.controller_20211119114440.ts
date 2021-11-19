import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { AnyInput } from '../../common/any.input';
import { SalesOrdersService } from './sales_orders.service';

@Controller('/sales_orders')
export class SalesOrdersController {
  constructor(private salesOrdersService: SalesOrdersService) {}
  @Post('/search')
  async search(@Body() body: AnyInput) {
    try {
      let result = null;
      if (body.data && body.data.id) {
        result = await this.salesOrdersService.entity(body.data.id);
      } else {
        result = await this.salesOrdersService.search(body.data);
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
      result = await this.salesOrdersService.save(body.data);
      return { data: result };
    } catch (error) {
      return { error: error };
    }
  }

  @Put('/update')
  async update(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.salesOrdersService.save(body.data);
      return { data: result };
    } catch (error) {
      return { error: error };
    }
  }

  @Delete('/delete')
  async delete(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.salesOrdersService.delete(
        body.data ? body.data.id : '',
      );
      return { data: result };
    } catch (error) {
      return { error: error };
    }
  }
}
