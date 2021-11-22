import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseInvoiceController } from 'src/module/purchase_invoice/purchase_invoice.controller';
import { PurchaseInvoice } from 'src/module/purchase_invoice/purchase_invoice.entity';
import { PurchaseInvoiceService } from 'src/module/purchase_invoice/purchase_invoice.service';
import { PurchaseItem } from 'src/module/purchase_item/purchase_item.entity';
import { PurchaseItemService } from 'src/module/purchase_item/purchase_item.service';
import { createQueryBuilder, createQueryBuilder, Repository } from 'typeorm';

describe('SalesOrdersController', () => {
  let purchaseInvoiceController: PurchaseInvoiceController;
  let purchaseInvoiceService: PurchaseInvoiceService;
  let purchaseInvoiceRepo: Repository<PurchaseInvoice>;
  let purchaseItemService: PurchaseItemService;
  let purchaseItemRepo: Repository<PurchaseItem>;
  let purchaseInvoiceData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseInvoiceController],
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
    purchaseInvoiceController = module.get<PurchaseInvoiceController>(
      PurchaseInvoiceController,
    );
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

  it('PurchaseInvoice controller should be defined', () => {
    expect(PurchaseInvoiceController).toBeDefined();
  });

  describe('Entity method', () => {
    it('should get PurchaseInvoice value by id', async () => {
      jest
        .spyOn(purchaseInvoiceService, 'entity')
        .mockImplementation(() => purchaseInvoiceData);
      let query = { data: { id: 'a6c44177-65b5-4071-a3b4-ae18eb4623c9' } };
      await purchaseInvoiceController.search(query);
      expect(purchaseInvoiceService.entity).toHaveBeenCalled();
    });
  });

  describe('Search method', () => {
    it('should be search empty', async () => {
      const createQueryBuilder: any = {
        select: () => createQueryBuilder,
      };
      jest
        .spyOn(purchaseInvoiceService, 'search')
        .mockImplementation(() => createQueryBuilder);
      let query = { data: {} };
      await purchaseInvoiceController.search(query);
      expect(purchaseInvoiceService.search).toHaveBeenCalled();
    });
  });

  describe('Save method', () => {
    it('should save PurchaseInvoice', async () => {
      jest
        .spyOn(purchaseInvoiceService, 'save')
        .mockImplementation(() => purchaseInvoiceData);
      let res: any = {
        data: {
          id: 'a6c44177-65b5-4071-a3b4-ae18eb4623c9',
          message: 'Saved Successfully.',
        },
      };
      await purchaseInvoiceController.save(purchaseInvoiceData);
      expect(purchaseInvoiceService.save).toHaveBeenCalled();
    });
  });

  describe('Delete method', () => {
    it('should delete PurchaseInvoice details by id', async () => {
      jest
        .spyOn(purchaseInvoiceService, 'delete')
        .mockImplementation(() => purchaseInvoiceData);
      let query: any = { data: { id: 'a6c44177-65b5-4071-a3b4-ae18eb4623c9' } };
      await purchaseInvoiceController.delete(query);
      expect(purchaseInvoiceService.delete).toHaveBeenCalled();
    });
  });
});
