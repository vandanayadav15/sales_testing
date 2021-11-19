import { Test, TestingModule } from '@nestjs/testing';
import { SalesItems } from '../../module/sales_items/sales_items.entity';
import { SalesItemsService } from '../../module/sales_items/sales_items.service';
import { SalesOrdersController } from '../../module/sales_orders/sales_orders.controller';
import { SalesOrders } from '../../module/sales_orders/sales_orders.entity';
import { SalesOrdersService } from '../../module/sales_orders/sales_orders.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SalesOrdersController', () => {
  let salesOrdersController: SalesOrdersController;
  let salesOrdersService: SalesOrdersService;
  let salesOrderRepo: Repository<SalesOrders>;
  let salesItemService: SalesItemsService;
  let salesItemsRepo: Repository<SalesItems>;
  let salesOrdersData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesOrdersController],
      providers: [
        SalesOrdersService,
        SalesItemsService,
        {
          provide: getRepositoryToken(SalesOrders),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SalesItems),
          useClass: Repository,
        },
      ],
    }).compile();
    salesOrdersController = module.get<SalesOrdersController>(
      SalesOrdersController,
    );
    salesOrdersService = module.get<SalesOrdersService>(SalesOrdersService);
    salesItemService = module.get<SalesItemsService>(SalesItemsService);
    salesOrderRepo = module.get<Repository<SalesOrders>>(
      getRepositoryToken(SalesOrders),
    );
    salesItemsRepo = module.get<Repository<SalesItems>>(
      getRepositoryToken(SalesItems),
    );
    salesOrdersData = {
      data: {
        id: '',
        invoiceId: '',
        discount: '0',
        taxAmount: 0.0,
        taxPercentage: 0.0,
        amount: 500,
        quantity: '1',
        salesItems: [
          {
            id: '',
            itemListId: { id: '72d0ef63-b002-47f2-998f-1f8b8c180cfd' },
            salesOrdersId: '',
            price: '100',
            quantity: '1',
            discount: '0',
            taxPercentage: 0.0,
            taxAmount: 0.0,
            amount: 200,
          },
          {
            id: '',
            itemListId: { id: '72d0ef63-b002-47f2-998f-1f8b8c180cfd' },
            salesOrdersId: '',
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

  it('SalesOrders controller should be defined', () => {
    expect(SalesOrdersController).toBeDefined();
  });

  describe('Entity method', () => {
    it('should get SalesOrders value by id', async () => {
      jest
        .spyOn(salesOrdersService, 'entity')
        .mockImplementation(() => salesOrdersData);
      let query = { data: { id: '123' } };
      await salesOrdersController.search(query);
      expect(salesOrdersService.entity).toHaveBeenCalled();
    });
  });

  describe('Search method', () => {
    it('should be search empty', async () => {
      jest
        .spyOn(salesOrdersService, 'search')
        .mockImplementation(() => salesOrdersData);
      let query = { data: {} };
      await salesOrdersController.search(query);
      expect(salesOrdersService.search).toHaveBeenCalled();
    });
  });

  describe('Save method', () => {
    it('should save SalesOrders', async () => {
      jest
        .spyOn(salesOrdersService, 'save')
        .mockImplementation(() => salesOrdersData);
      let res: any = {
        data: {
          id: '123',
          message: 'Saved Successfully.',
        },
      };
      await salesOrdersController.save(salesOrdersData);
      expect(salesOrdersService.save).toHaveBeenCalled();
    });
  });

  describe('Delete method', () => {
    it('should delete SalesOrders details by id', async () => {
      jest
        .spyOn(salesOrdersService, 'delete')
        .mockImplementation(() => salesOrdersData);
      let query: any = { data: { id: '123' } };
      await salesOrdersController.delete(query);
      expect(salesOrdersService.delete).toHaveBeenCalled();
    });
  });
});
