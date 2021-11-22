import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemListController } from 'src/module/item_list/item_list.controller';
import { ItemList } from 'src/module/item_list/item_list.entity';
import { ItemListService } from 'src/module/item_list/item_list.service';
import { Repository } from 'typeorm';

describe('ItemListController', () => {
  let itemListController: ItemListController;
  let itemListService: ItemListService;
  let itemListRepo: Repository<ItemList>;

  let itemListData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemListController],
      providers: [
        ItemListService,
        {
          provide: getRepositoryToken(ItemList),
          useClass: Repository,
        },
      ],
    }).compile();
    itemListController = module.get<ItemListController>(ItemListController);

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

  it('stockItem controller should be defined', () => {
    expect(ItemListController).toBeDefined();
  });

  describe('Entity method', () => {
    it('should get ItemList value by id', async () => {
      jest
        .spyOn(itemListService, 'entity')
        .mockImplementation(() => itemListData);
      let query = { data: { id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71' } };
      await itemListController.search(query);
      expect(itemListService.entity).toHaveBeenCalled();
    });
  });

  describe('Search method', () => {
    it('should be search empty', async () => {
      jest
        .spyOn(itemListService, 'search')
        .mockImplementation(() => itemListData);
      let query = { data: {} };
      await itemListController.search(query);
      expect(itemListService.search).toHaveBeenCalled();
    });
  });

  describe('Save method', () => {
    it('should save stockItem', async () => {
      jest
        .spyOn(itemListService, 'save')
        .mockImplementation(() => itemListData);
      let res: any = {
        data: {
          id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71',
          message: 'Saved Successfully.',
        },
      };
      await itemListController.save(itemListData);
      expect(itemListService.save).toHaveBeenCalled();
    });
  });

  describe('Delete method', () => {
    it('should delete stockItem details by id', async () => {
      jest
        .spyOn(itemListService, 'delete')
        .mockImplementation(() => itemListData);
      let query: any = { data: { id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71' } };
      await itemListController.delete(query);
      expect(itemListService.delete).toHaveBeenCalled();
    });
  });
});
