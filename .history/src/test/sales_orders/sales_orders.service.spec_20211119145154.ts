import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalesItems } from '../../module/sales_items/sales_items.entity';
import { SalesItemsService } from '../../module/sales_items/sales_items.service';
import { SalesOrdersController } from '../../module/sales_orders/sales_orders.controller';
import { SalesOrders } from '../../module/sales_orders/sales_orders.entity';
import { SalesOrdersService } from '../../module/sales_orders/sales_orders.service';
import { Repository } from 'typeorm';

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

  describe('should be defined', () => {
    it('defined here', () => {
      expect(salesOrdersService).toBeDefined();
    });
  });

  //   describe(' - Entity Method Defined ', () => {
  //     it('should get salesOrders details by id', async () => {
  //       jest
  //         .spyOn(salesOrderRepo, 'findOne')
  //         .mockResolvedValueOnce(salesOrdersData);
  //       expect(
  //         await salesOrdersService.entity('ab6ffb3c-6744-4454-affb-2b936fba6d98'),
  //       ).toEqual(salesOrdersData);
  //     });
  //     it('should not get salesOrders details entity invalid id', async () => {
  //       let errorRes: any = {
  //         data: null,
  //       };
  //       jest.spyOn(salesOrderRepo, 'findOne').mockResolvedValueOnce(errorRes);
  //       expect(
  //         await salesOrdersService.entity('ab6ffb3c-6744-4454-affb-2b936fba6d98'),
  //       ).toEqual(errorRes);
  //     });
  //   });

  //   describe(' - Search Method Defined', () => {
  //     it('search active records', async () => {
  //       jest
  //         .spyOn(salesOrderRepo, 'find')
  //         .mockResolvedValueOnce([salesOrdersData]);
  //       let query: any = { active: true };
  //       expect(await salesOrdersService.search(query)).toEqual([salesOrdersData]);
  //     });
  //     it('should get all salesOrders details inactive records', async () => {
  //       let resData: any = {
  //         data: [],
  //       };
  //       jest.spyOn(salesOrderRepo, 'find').mockResolvedValueOnce(resData);
  //       let query: any = { active: false };
  //       expect(await salesOrdersService.search(query)).toEqual(resData);
  //     });
  //   });

  describe(' - Save Method', () => {
    it('save valid data', async () => {
      let data: any = {
        //id: '123',
        message: 'Saved Successfully.',
      };
      jest
        .spyOn(salesItemsRepo, 'findOne')
        .mockResolvedValueOnce(salesOrdersData.data.salesItems);
      jest
        .spyOn(salesItemsRepo, 'save')
        .mockResolvedValueOnce(salesOrdersData.data.salesItems);
      jest
        .spyOn(salesOrderRepo, 'findOne')
        .mockResolvedValueOnce(salesOrdersData.data);
      jest
        .spyOn(salesOrderRepo, 'save')
        .mockResolvedValueOnce(salesOrdersData.data);
      expect(await salesOrdersService.save(salesOrdersData.data)).toEqual(data);
    });
  });

  describe(' - Delete Method', () => {
    it('delete valid data', async () => {
      let reqData: any = {
        data: { id: 'ab6ffb3c-6744-4454-affb-2b936fba6d98' },
      };
      let data: any = {
        id: 'ab6ffb3c-6744-4454-affb-2b936fba6d98',
        message: 'Removed Successfully.',
      };
      jest
        .spyOn(salesOrderRepo, 'findOne')
        .mockResolvedValueOnce(salesOrdersData);
      jest.spyOn(salesOrderRepo, 'save').mockResolvedValueOnce(salesOrdersData);
      expect(await salesOrdersService.delete(reqData.data.id)).toEqual(data);
    });
  });
});
