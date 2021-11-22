import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ItemList } from "src/module/item_list/item_list.entity";
import { ItemListService } from "src/module/item_list/item_list.service";
import { SalesItems } from "src/module/sales_items/sales_items.entity";
import { SalesItemsService } from "src/module/sales_items/sales_items.service";
import { SalesOrders } from "src/module/sales_orders/sales_orders.entity";
import { SalesOrdersService } from "src/module/sales_orders/sales_orders.service";
import { Repository } from "typeorm";


describe('Bank Service', () => {
  let salesItemsService: SalesItemsService;
  let salesOrdersService: SalesOrdersService;
  let salesItmsRepo: Repository<SalesItems>;
  let salesOrdersRepo: Repository<SalesOrders>;
  let itemListService: ItemListService
  let itemListrepo:Repository<ItemList>
  let bankData: any = {};
  let addresData: any = {};

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
    salesItemsService = module.get<SalesItemsService>(SalesItemsService);
      salesOrdersService = module.get<SalesOrdersService>(SalesOrdersService);
      itemListService = module.get<ItemListService>(ItemListService);
    salesItmsRepo = module.get<Repository<SalesItems>>(
        getRepositoryToken(SalesItems),
       itemListrepo = module.get<Repository<ItemList>>(
           getRepositoryToken(ItemList),
           salesOrdersRepo = module.get<Repository<SalesOrdersService>>(
        getRepositoryToken(SalesOrdersService), 
    );
    addressRepo = module.get<Repository<Address>>(getRepositoryToken(Address));
    bankData = {
      data: {
        id: '123',
        bankName: 'xyz',
        branchName: 'xyz',
        ifscCode: 'xyz',
        accountName: 'xyz',
        accountNum: 'xyz',
        overDraftLimit: 100,
        address: {
          id: '123',
          lane: 'xyz',
          street: 'xyz',
          area: 'xyz',
          city: 'xyz',
          state: 'xyz',
          country: 'xyz',
          pincode: '100101',
        },
      },
    };
  });

  describe('should be defined', () => {
    it('defined here', () => {
      expect(salesItemsService).toBeDefined();
    });
  });

  describe(' - Entity Method Defined ', () => {
    it('should get bank details by id', async () => {
      jest.spyOn(bankRepo, 'findOne').mockResolvedValueOnce(bankData);
      expect(await salesItemsService.entity('123')).toEqual(bankData);
    });
    it('should not get bank details entity invalid id', async () => {
      let errorRes: any = {
        data: null,
      };
      jest.spyOn(bankRepo, 'findOne').mockResolvedValueOnce(errorRes);
      expect(await salesItemsService.entity('1234')).toEqual(errorRes);
    });
  });

  describe(' - Search Method Defined', () => {
    it('search active records', async () => {
      jest.spyOn(bankRepo, 'find').mockResolvedValueOnce([bankData]);
      let query: any = { active: true };
      expect(await salesItemsService.search(query)).toEqual([bankData]);
    });
    it('should get all bank details inactive records', async () => {
      let resData: any = {
        data: [],
      };
      jest.spyOn(bankRepo, 'find').mockResolvedValueOnce(resData);
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
        .spyOn(addressRepo, 'findOne')
        .mockResolvedValueOnce(bankData.data.address);
      jest
        .spyOn(addressRepo, 'save')
        .mockResolvedValueOnce(bankData.data.address);
      jest.spyOn(bankRepo, 'findOne').mockResolvedValueOnce(bankData.data);
      jest.spyOn(bankRepo, 'save').mockResolvedValueOnce(bankData.data);
      expect(await salesItemsService.save(bankData.data)).toEqual(data);
    });
  });

  describe(' - Delete Method', () => {
    it('delete valid data', async () => {
      let reqData: any = { data: { id: '123' } };
      let data: any = {
        id: '123',
        message: 'Removed Successfully.',
      };
      jest.spyOn(bankRepo, 'findOne').mockResolvedValueOnce(bankData);
      jest.spyOn(bankRepo, 'save').mockResolvedValueOnce(bankData);
      expect(await salesItemsService.delete(reqData.data.id)).toEqual(data);
    });
  });
});
