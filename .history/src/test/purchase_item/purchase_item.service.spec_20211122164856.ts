import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseInvoice } from 'src/module/purchase_invoice/purchase_invoice.entity';
import { PurchaseInvoiceService } from 'src/module/purchase_invoice/purchase_invoice.service';
import { PurchaseItem } from 'src/module/purchase_item/purchase_item.entity';
import { PurchaseItemService } from 'src/module/purchase_item/purchase_item.service';
import { StockItem } from 'src/module/stock_item/stock_item.entity';
import { StockItemService } from 'src/module/stock_item/stock_item.service';
import { Repository } from 'typeorm';

describe('PurchaseItems Service', () => {
  let purchaseItemService: PurchaseItemService;
  let purchaseInvoiceService: PurchaseInvoiceService;
  let stockItemService: StockItemService;
  let purchaseItemRepo: Repository<PurchaseItem>;
  let purchaseInvoiceRepo: Repository<PurchaseInvoice>;
  let stockItemrepo: Repository<StockItem>;
  let purchaseItmesData: any = {};
  let purchaseInvoiceData: any = {};
  let stockItemData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseItemService,
        StockItemService,
        PurchaseInvoiceService,
        {
          provide: getRepositoryToken(PurchaseItemService),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(StockItemService),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PurchaseInvoiceService),
          useClass: Repository,
        },
      ],
    }).compile();
    purchaseItemService = module.get<PurchaseItemService>(PurchaseItemService);
    stockItemService = module.get<StockItemService>(StockItemService);
    purchaseInvoiceService = module.get<PurchaseInvoiceService>(
      PurchaseInvoiceService,
    );

    purchaseItemRepo = module.get<Repository<PurchaseItem>>(
      getRepositoryToken(PurchaseItem),
    );
    purchaseInvoiceRepo = module.get<Repository<PurchaseInvoice>>(
      getRepositoryToken(PurchaseInvoice),
    );
    stockItemrepo = module.get<Repository<StockItem>>(
      getRepositoryToken(StockItem),
    );
    purchaseItmesData = {
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
      expect(purchaseItemService).toBeDefined();
    });
  });

  describe(' - Entity Method Defined ', () => {
    it('should get salesItems details by id', async () => {
      jest
        .spyOn(purchaseItemRepo, 'findOne')
        .mockResolvedValueOnce(purchaseItmesData);
      expect(await purchaseItemService.entity('123')).toEqual(
        purchaseItmesData,
      );
    });
    it('should not get salesItems details entity invalid id', async () => {
      let errorRes: any = {
        data: null,
      };
      jest.spyOn(purchaseItemRepo, 'findOne').mockResolvedValueOnce(errorRes);
      expect(await purchaseItemService.entity('1234')).toEqual(errorRes);
    });
  });

  describe(' - Search Method Defined', () => {
    it('search active records', async () => {
      jest
        .spyOn(purchaseItemRepo, 'find')
        .mockResolvedValueOnce([purchaseItmesData]);
      let query: any = { active: true };
      expect(await purchaseItemService.search(query)).toEqual([
        purchaseItmesData,
      ]);
    });
    it('should get all bank details inactive records', async () => {
      let resData: any = {
        data: [],
      };
      jest.spyOn(purchaseItemRepo, 'find').mockResolvedValueOnce(resData);
      let query: any = { active: false };
      expect(await purchaseItemService.search(query)).toEqual(resData);
    });
  });

  describe(' - Save Method', () => {
    it('save valid data', async () => {
      let data: any = {
        id: '123',
        message: 'Saved Successfully.',
      };
      jest
        .spyOn(purchaseInvoiceRepo, 'findOne')
        .mockResolvedValueOnce(purchaseItmesData.data.salesOrders);
      jest
        .spyOn(purchaseInvoiceRepo, 'save')
        .mockResolvedValueOnce(purchaseItmesData.data.salesOrders);

      jest
        .spyOn(stockItemrepo, 'findOne')
        .mockResolvedValueOnce(purchaseItmesData.data.itemList);
      jest
        .spyOn(stockItemrepo, 'save')
        .mockResolvedValueOnce(purchaseItmesData.data.itemList);
      jest
        .spyOn(purchaseItemRepo, 'findOne')
        .mockResolvedValueOnce(purchaseItmesData.data);
      jest
        .spyOn(purchaseItemRepo, 'save')
        .mockResolvedValueOnce(purchaseItmesData.data);
      expect(await purchaseItemService.save(purchaseItmesData.data)).toEqual(
        data,
      );
    });
  });

  describe(' - Delete Method', () => {
    it('delete valid data', async () => {
      let reqData: any = { data: { id: '123' } };
      let data: any = {
        id: '123',
        message: 'Removed Successfully.',
      };
      jest
        .spyOn(purchaseItemRepo, 'findOne')
        .mockResolvedValueOnce(purchaseItmesData);
      jest
        .spyOn(purchaseItemRepo, 'save')
        .mockResolvedValueOnce(purchaseItmesData);
      expect(await purchaseItemService.delete(reqData.data.id)).toEqual(data);
    });
  });
});
