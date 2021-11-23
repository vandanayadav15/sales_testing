import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseInvoice } from '../../module/purchase_invoice/purchase_invoice.entity';
import { PurchaseInvoiceService } from '../../module/purchase_invoice/purchase_invoice.service';
import { PurchaseItem } from '../../module/purchase_item/purchase_item.entity';
import { PurchaseItemService } from '../../module/purchase_item/purchase_item.service';
import { Repository } from 'typeorm';

describe('SalesOrdersController', () => {
  let purchaseInvoiceService: PurchaseInvoiceService;
  let purchaseInvoiceRepo: Repository<PurchaseInvoice>;
  let purchaseItemService: PurchaseItemService;
  let purchaseItemRepo: Repository<PurchaseItem>;
  let purchaseInvoiceData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseInvoiceService,
        PurchaseItemService,
        {
          provide: getRepositoryToken(PurchaseInvoice),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PurchaseItem),
          useClass: Repository,
        },
      ],
    }).compile();
    purchaseInvoiceService = module.get<PurchaseInvoiceService>(
      PurchaseInvoiceService,
    );
    purchaseItemService = module.get<PurchaseItemService>(PurchaseItemService);
    purchaseInvoiceRepo = module.get<Repository<PurchaseInvoice>>(
      getRepositoryToken(PurchaseInvoice),
    );
    purchaseItemRepo = module.get<Repository<PurchaseItem>>(
      getRepositoryToken(PurchaseItem),
    );
    purchaseInvoiceData = {
      data: {
        id: '',
        companyName: 'Max',
        billTo: 'vandana',
        price: '0.0',
        discount: '0.0',
        totalAmount: 0.0,
        taxAmount: 0.0,
        taxPercentage: 0.0,
        quantity: 0,
        purchaseItem: [
          {
            id: '',
            stockItemId: { id: '1b3c2aaf-d669-4e6b-8060-96a883e022e2' },
            purchaseInvoiceId: '',
            price: '100',
            quantity: '1',
            discount: '0',
            taxPercentage: 0.0,
            taxAmount: 0.0,
            amount: 200,
          },
          {
            id: '',
            stockItemId: { id: '1b3c2aaf-d669-4e6b-8060-96a883e022e2' },
            purchaseInvoiceId: '',
            price: '100',
            quantity: '1',
            discount: '0',
            taxPercentage: 0.0,
            taxAmount: 0.0,
            amount: 200,
          },
        ],
      },
    };
  });

  describe('should be defined', () => {
    it('defined here', () => {
      expect(purchaseInvoiceService).toBeDefined();
    });
  });

  describe(' - Entity Method Defined ', () => {
    it('should get purchaseInvoice details by id', async () => {
      jest
        .spyOn(purchaseInvoiceRepo, 'findOne')
        .mockResolvedValueOnce(purchaseInvoiceData);
      expect(
        await purchaseInvoiceService.entity(
          'a6c44177-65b5-4071-a3b4-ae18eb4623c9',
        ),
      ).toEqual(purchaseInvoiceData);
    });
    it('should not get purchaseInvoice details entity invalid id', async () => {
      let errorRes: any = {
        data: null,
      };
      jest
        .spyOn(purchaseInvoiceRepo, 'findOne')
        .mockResolvedValueOnce(errorRes);
      expect(
        await purchaseInvoiceService.entity(
          'a6c44177-65b5-4071-a3b4-ae18eb4623c9',
        ),
      ).toEqual(errorRes);
    });
  });

  describe(' - Search Method Defined', () => {
    it('search active records', async () => {
      jest
        .spyOn(purchaseInvoiceRepo, 'find')
        .mockResolvedValueOnce([purchaseInvoiceData]);
      let query: any = { active: true };
      expect(await purchaseInvoiceService.search(query)).toEqual([
        purchaseInvoiceData,
      ]);
    });
    it('should get all purchaseInvoice details inactive records', async () => {
      let resData: any = {
        data: [],
      };
      jest.spyOn(purchaseInvoiceRepo, 'find').mockResolvedValueOnce(resData);
      let query: any = { active: false };
      expect(await purchaseInvoiceService.search(query)).toEqual(resData);
    });
  });

  // describe('Save method', () => {
  //   it('should save PurchaseInvoice', async () => {
  //     jest
  //       .spyOn(purchaseInvoiceService, 'save')
  //       .mockImplementation(() => purchaseInvoiceData);
  //     let res: any = {
  //       data: {
  //         id: 'a6c44177-65b5-4071-a3b4-ae18eb4623c9',
  //         message: 'Saved Successfully.',
  //       },
  //     };
  //     await purchaseInvoiceController.save(purchaseInvoiceData);
  //     expect(purchaseInvoiceService.save).toHaveBeenCalled();
  //   });
  // });

  // describe('Delete method', () => {
  //   it('should delete PurchaseInvoice details by id', async () => {
  //     jest
  //       .spyOn(purchaseInvoiceService, 'delete')
  //       .mockImplementation(() => purchaseInvoiceData);
  //     let query: any = { data: { id: 'a6c44177-65b5-4071-a3b4-ae18eb4623c9' } };
  //     await purchaseInvoiceController.delete(query);
  //     expect(purchaseInvoiceService.delete).toHaveBeenCalled();
  //   });
  // });
});
