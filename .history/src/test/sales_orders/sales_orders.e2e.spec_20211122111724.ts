import { Test } from '@nestjs/testing';
let axios = require('axios');
let axiosAPIClient;
//Thia is a Json OBj that contains base URL of the ledgur server
const axiosConfig = {
  baseURL: `http://localhost:5004/`,
  validateStatus: () => true,
};

beforeAll(async () => {
  axiosAPIClient = await axios.create(axiosConfig);
});

afterAll(async (done) => {
  done();
});
const salesOrdersData = {
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
describe('/save (POST)', () => {
  test('Assert if a new sales can be created with mandatory details', async () => {
    const receivedAPIResponse = await axiosAPIClient.post(
      'salesOrders/save',
      salesOrdersData,
    );
    let expected = {
      data: {
        id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71',
        message: 'Saved Successfully.',
      },
    };
    const received = receivedAPIResponse.data;
    expect(received).toEqual(expected);
  }, 10000);
  test('Assert if a new sales can be created without mandatory details', async () => {
    let expected = {
      data: {
        id: 'beeac73e-e21a-413f-b1a9-e274a0bfff71',
        message: 'Saved Successfully.',
      },
    };
    const receivedAPIResponse = await axiosAPIClient.post(
      'salesOrders/save',
      salesOrdersData,
    );
    const received = receivedAPIResponse.data;
    if (received.error) {
      throw new Error('id is mandatory' + received.error.message);
    } else {
      expect(received).toMatchObject(expected);
    }
  });
});
