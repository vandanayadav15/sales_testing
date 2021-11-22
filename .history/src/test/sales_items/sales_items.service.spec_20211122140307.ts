import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemList } from '../../module/item_list/item_list.entity';
import { ItemListService } from '../../module/item_list/item_list.service';
import { SalesItems } from '../../module/sales_items/sales_items.entity';
import { SalesItemsService } from '../../module/sales_items/sales_items.service';
import { SalesOrders } from '../../module/sales_orders/sales_orders.entity';
import { SalesOrdersService } from '../../module/sales_orders/sales_orders.service';
import { Repository } from 'typeorm';

describe('SalesItems Service', () => {
  let salesItemsService: SalesItemsService;
  let salesOrdersService: SalesOrdersService;
  let salesItemsRepo: Repository<SalesItems>;
  let salesOrdersRepo: Repository<SalesOrders>;
  let itemListService: ItemListService;
  let itemListrepo: Repository<ItemList>;
  let salesItmesData: any = {};
  let salesOrdersData: any = {};
  let itemListData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesItemsService,
        SalesOrdersService,
        ItemListService,
        {
          provide: getRepositoryToken(SalesItemsService),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SalesOrdersService),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ItemListService),
          useClass: Repository,
        },
      ],
    }).compile();
    salesOrdersService = module.get<SalesOrdersService>(SalesOrdersService);
    salesItemsService = module.get<SalesItemsService>(SalesItemsService);
    itemListService = module.get<ItemListService>(ItemListService);
    salesOrdersRepo = module.get<Repository<SalesOrders>>(
      getRepositoryToken(SalesOrders),
    );
    salesItemsRepo = module.get<Repository<SalesItems>>(
      getRepositoryToken(SalesItems),
    );
    itemListrepo = module.get<Repository<ItemList>>(
      getRepositoryToken(ItemList),
    );
    salesItmesData = {
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
      expect(salesItemsService).toBeDefined();
    });
  });

  describe(' - Entity Method Defined ', () => {
    it('should get salesItems details by id', async () => {
      jest
        .spyOn(salesItemsRepo, 'findOne')
        .mockResolvedValueOnce(salesItmesData);
      expect(await salesItemsService.entity('123')).toEqual(salesItmesData);
    });
    it('should not get salesItems details entity invalid id', async () => {
      let errorRes: any = {
        data: null,
      };
      jest.spyOn(salesItemsRepo, 'findOne').mockResolvedValueOnce(errorRes);
      expect(await salesItemsService.entity('1234')).toEqual(errorRes);
    });
  });

  describe(' - Search Method Defined', () => {
    it('search active records', async () => {
      jest
        .spyOn(salesItemsRepo, 'find')
        .mockResolvedValueOnce([salesItmesData]);
      let query: any = { active: true };
      expect(await salesItemsService.search(query)).toEqual([salesItmesData]);
    });
    it('should get all bank details inactive records', async () => {
      let resData: any = {
        data: [],
      };
      jest.spyOn(salesItemsRepo, 'find').mockResolvedValueOnce(resData);
      let query: any = { active: false };
      expect(await salesItemsService.search(query)).toEqual(resData);
    });
  });

  describe(' - Save Method', () => {
    it('save valid data', async () => {
      let data: any = {
        id: '123',
        message: 'Saved Successfully.',
      };
      jest
        .spyOn(salesOrdersRepo, 'findOne')
        .mockResolvedValueOnce(salesItmesData.data.salesOrders);
      jest
        .spyOn(salesOrdersRepo, 'save')
        .mockResolvedValueOnce(salesItmesData.data.salesOrders);

      jest
        .spyOn(itemListrepo, 'findOne')
        .mockResolvedValueOnce(salesItmesData.data.itemList);
      jest
        .spyOn(itemListrepo, 'save')
        .mockResolvedValueOnce(salesItmesData.data.itemList);
      jest
        .spyOn(salesItemsRepo, 'findOne')
        .mockResolvedValueOnce(salesItmesData.data);
      jest
        .spyOn(salesItemsRepo, 'save')
        .mockResolvedValueOnce(salesItmesData.data);
      expect(await salesItemsService.save(salesItmesData.data)).toEqual(data);
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
        .spyOn(salesItemsRepo, 'findOne')
        .mockResolvedValueOnce(salesItmesData);
      jest.spyOn(salesItemsRepo, 'save').mockResolvedValueOnce(salesItmesData);
      expect(await salesItemsService.delete(reqData.data.id)).toEqual(data);
    });
  });
});
