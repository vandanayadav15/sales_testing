import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockItem } from '../../module/stock_item/stock_item.entity';
import { StockItemService } from '../../module/stock_item/stock_item.service';
import { Repository } from 'typeorm';

describe('Stock Item Service', () => {
  let stockItemService: StockItemService;
  let stockItemRepo: Repository<StockItem>;

  let stockItemData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockItemService,
        {
          provide: getRepositoryToken(StockItem),
          useClass: Repository,
        },
      ],
    }).compile();

    stockItemService = module.get<StockItemService>(StockItemService);
    stockItemRepo = module.get<Repository<StockItem>>(
      getRepositoryToken(StockItem),
    );

    stockItemData = {
      data: {
        id: ' ',
        name: 'vv',
        brand: 'vv',
        defaultPrice: '10.11',
        description: 'vv',
        active: true,
      },
    };
  });

  describe('should be defined', () => {
    it('defined here', () => {
      expect(StockItemService).toBeDefined();
    });
  });

  describe(' - Entity Method Defined ', () => {
    it('should get bank details by id', async () => {
      jest.spyOn(stockItemRepo, 'findOne').mockResolvedValueOnce(stockItemData);
      expect(
        await stockItemService.entity('1b3c2aaf-d669-4e6b-8060-96a883e022e2'),
      ).toEqual(stockItemData);
    });
    it('should not get bank details entity invalid id', async () => {
      let errorRes: any = {
        data: null,
      };
      jest.spyOn(stockItemRepo, 'findOne').mockResolvedValueOnce(errorRes);
      expect(
        await stockItemService.entity('1b3c2aaf-d669-4e6b-8060-96a883e022e2'),
      ).toEqual(errorRes);
    });
  });

  describe(' - Search Method Defined', () => {
    it('search active records', async () => {
      jest.spyOn(stockItemRepo, 'find').mockResolvedValueOnce([stockItemData]);
      let query: any = { active: true };
      expect(await stockItemService.search(query)).toEqual([stockItemData]);
    });
    it('should get all bank details inactive records', async () => {
      let resData: any = {
        data: [],
      };
      jest.spyOn(stockItemRepo, 'find').mockResolvedValueOnce(resData);
      let query: any = { active: false };
      expect(await stockItemService.search(query)).toEqual(resData);
    });
  });

  describe(' - Save Method', () => {
    it('save valid data', async () => {
      let data: any = {
        id: '1b3c2aaf-d669-4e6b-8060-96a883e022e2',
        message: 'Saved Successfully.',
      };
      jest
        .spyOn(stockItemRepo, 'findOne')
        .mockResolvedValueOnce(stockItemData.data);
      jest
        .spyOn(stockItemRepo, 'save')
        .mockResolvedValueOnce(stockItemData.data);
      expect(await stockItemService.save(stockItemData.data)).toEqual(data);
    });
  });

  describe(' - Delete Method', () => {
    it('delete valid data', async () => {
      let reqData: any = { data: { id: '123' } };
      let data: any = {
        id: '1b3c2aaf-d669-4e6b-8060-96a883e022e2',
        message: 'Removed Successfully.',
      };
      jest.spyOn(stockItemRepo, 'findOne').mockResolvedValueOnce(stockItemData);
      jest.spyOn(stockItemRepo, 'save').mockResolvedValueOnce(stockItemData);
      expect(await stockItemService.delete(reqData.data.id)).toEqual(data);
    });
  });
});
