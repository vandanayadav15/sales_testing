import { Body, Controller, Post } from '@nestjs/common';
import { identity } from 'rxjs';
import { AnyInput } from 'src/common/any.input';
import { PurchaseInvoiceService } from './purchase_invoice.service';

@Controller('/purchase_invoice')
export class PurchaseInvoiceController {
  constructor(private purchaseInvoiceService: PurchaseInvoiceService) {}
  @Post('/search')
  async search(@Body() body: AnyInput) {
    try {
      let result = null;
      if (body.data && body.data.id) {
        result = await this.purchaseInvoiceService.entity(body.data.id);
      } else {
        result = await this.purchaseInvoiceService.search(body.data);
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
      result = await this.purchaseInvoiceService.save(body.data);
      return { data: result };
    } catch (error) {
      return error;
    }
  }

  @Post('/update')
  async update(@Body() body: AnyInput) {
    try {
      let result = null;
      result = await this.purchaseInvoiceService.save(body.data);
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
        result = await this.purchaseInvoiceService.delete(
          body.data ? body.data.id : '',
        );
        return { data: result };
      }
    } catch (error) {
      return error;
    }
  }
}
