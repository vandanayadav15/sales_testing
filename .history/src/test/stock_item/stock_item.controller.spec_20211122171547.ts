import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockItemController } from '../../module/stock_item/stock_item.controller';
import { StockItem } from '../../module/stock_item/stock_item.entity';
import { StockItemService } from '../../module/stock_item/stock_item.service';
import { Repository } from 'typeorm';

describe('SalesOrdersController', () => {
  let stockItemController: StockItemController;
  let stockItemService: StockItemService;
  let stockItemRepo: Repository<StockItem>;

  let stockItemData: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemController],
      providers: [
        StockItemService,
        {
          provide: getRepositoryToken(StockItem),
          useClass: Repository,
        },
      ],
    }).compile();
    stockItemController = module.get<StockItemController>(StockItemController);

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

  it('stockItem controller should be defined', () => {
    expect(StockItemController).toBeDefined();
  });

  describe('Entity method', () => {
    it('should get stockItem value by id', async () => {
      jest
        .spyOn(stockItemService, 'entity')
        .mockImplementation(() => stockItemData);
      let query = { data: { id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71' } };
      await stockItemController.search(query);
      expect(stockItemService.entity).toHaveBeenCalled();
    });
  });

  describe('Search method', () => {
    it('should be search empty', async () => {
      jest
        .spyOn(stockItemService, 'search')
        .mockImplementation(() => stockItemData);
      let query = { data: {} };
      await stockItemController.search(query);
      expect(stockItemService.search).toHaveBeenCalled();
    });
  });

  describe('Save method', () => {
    it('should save stockItem', async () => {
      jest
        .spyOn(stockItemService, 'save')
        .mockImplementation(() => stockItemData);
      let res: any = {
        data: {
          id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71',
          message: 'Saved Successfully.',
        },
      };
      await stockItemController.save(stockItemData);
      expect(stockItemService.save).toHaveBeenCalled();
    });
  });

  describe('Delete method', () => {
    it('should delete stockItem details by id', async () => {
      jest
        .spyOn(stockItemService, 'delete')
        .mockImplementation(() => stockItemData);
      let query: any = { data: { id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71' } };
      await stockItemController.delete(query);
      expect(stockItemService.delete).toHaveBeenCalled();
    });
  });
});
