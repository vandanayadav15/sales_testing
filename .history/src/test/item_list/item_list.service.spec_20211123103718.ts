import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemListController } from '../../module/item_list/item_list.controller';
import { ItemList } from '../../module/item_list/item_list.entity';
import { ItemListService } from '../../module/item_list/item_list.service';
import { Repository } from 'typeorm';

describe('ItemListController', () => {
  let itemListController: ItemListController;
  let itemListService: ItemListService;
  let itemListRepo: Repository<ItemList>;

  let itemListData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemListService,
        {
          provide: getRepositoryToken(ItemList),
          useClass: Repository,
        },
      ],
    }).compile();
    itemListService = module.get<ItemListService>(ItemListService);
    itemListRepo = module.get<Repository<ItemList>>(
      getRepositoryToken(ItemList),
    );

    itemListData = {
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
      expect(ItemListService).toBeDefined();
    });
  });

  describe(' - Entity Method Defined ', () => {
    it('should get bank details by id', async () => {
      jest.spyOn(itemListRepo, 'findOne').mockResolvedValueOnce(itemListData);
      expect(
        await itemListService.entity('1b3c2aaf-d669-4e6b-8060-96a883e022e2'),
      ).toEqual(itemListData);
    });
    it('should not get bank details entity invalid id', async () => {
      let errorRes: any = {
        data: null,
      };
      jest.spyOn(itemListRepo, 'findOne').mockResolvedValueOnce(errorRes);
      expect(
        await itemListService.entity('1b3c2aaf-d669-4e6b-8060-96a883e022e2'),
      ).toEqual(errorRes);
    });
  });

  describe(' - Search Method Defined', () => {
    it('search active records', async () => {
      jest.spyOn(itemListRepo, 'find').mockResolvedValueOnce([itemListData]);
      let query: any = { active: true };
      expect(await itemListService.search(query)).toEqual([itemListData]);
    });
    it('should get all bank details inactive records', async () => {
      let resData: any = {
        data: [],
      };
      jest.spyOn(itemListRepo, 'find').mockResolvedValueOnce(resData);
      let query: any = { active: false };
      expect(await itemListService.search(query)).toEqual(resData);
    });
  });

  describe(' - Save Method', () => {
    it('save valid data', async () => {
      let data: any = {
        id: '1b3c2aaf-d669-4e6b-8060-96a883e022e2',
        message: 'Saved Successfully.',
      };
      jest
        .spyOn(itemListRepo, 'findOne')
        .mockResolvedValueOnce(itemListData.data);
      jest.spyOn(itemListRepo, 'save').mockResolvedValueOnce(itemListData.data);
      expect(await itemListService.save(itemListData.data)).toEqual(data);
    });
  });

  describe(' - Delete Method', () => {
    it('delete valid data', async () => {
      let reqData: any = { data: { id: '123' } };
      let data: any = {
        id: '1b3c2aaf-d669-4e6b-8060-96a883e022e2',
        message: 'Removed Successfully.',
      };
      jest.spyOn(itemListRepo, 'findOne').mockResolvedValueOnce(itemListData);
      jest.spyOn(itemListRepo, 'save').mockResolvedValueOnce(itemListData);
      expect(await itemListService.delete(reqData.data.id)).toEqual(data);
    });
  });
});
