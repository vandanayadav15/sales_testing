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
const salesItemsData = {
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
      salesItemsData,
    );
    let expected = {
      data: {
        id: '6e0acd0f-c33e-4714-a3ef-42764140860e',
        message: 'Saved Successfully.',
      },
    };
    const received = receivedAPIResponse.data;
    expect(received).toMatchObject(expected);
  }, 10000);
  test('Assert if a new sales can be created without mandatory details', async () => {
    let expected = {
      data: {
        id: '6e0acd0f-c33e-4714-a3ef-42764140860e',
        message: 'Saved Successfully.',
      },
    };
    const receivedAPIResponse = await axiosAPIClient.post(
      'salesOrders/save',
      salesItemsData,
    );
    const received = receivedAPIResponse.data;
    if (received.error) {
      throw new Error('id is mandatory' + received.error.message);
    } else {
      expect(received).toMatchObject(expected);
    }
  });

  describe('/search (POST)', () => {
    test('Assert if there is a salesItems for the given ID', async () => {
      let searchData = {
        data: { id: '6e0acd0f-c33e-4714-a3ef-42764140860e' },
      };
      const receivedAPIResponse = await axiosAPIClient.post(
        'salesItems/search',
        searchData,
      );
      const expected = {
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
      const received = receivedAPIResponse.data;
      expect(received).toMatchObject(expected);
    }, 10000);
  });

  describe('/delete ', () => {
    test('Assert the message after deleting the salesItems', async () => {
      let deleteInput = {
        data: { id: '6c07f498-1713-4080-b959-3becd460e01e' },
      };
      const receivedAPIResponse = await axiosAPIClient.delete(
        'salesItems/delete',
        deleteInput,
      );
      let expected = {
        data: {
          id: '6c07f498-1713-4080-b959-3becd460e01e',
          message: 'Removed Successfully.',
        },
      };
      const received = receivedAPIResponse.data;
      expect(received).toEqual(expected);
    }, 10000);

    test('Assert the response if a delete is performed when a bank is already deleted', async () => {
      let deleteInput = {
        data: { id: '6c07f498-1713-4080-b959-3becd460e01e' },
      };
      const receivedAPIResponse = await axiosAPIClient.delete(
        'salesItems/delete',
        deleteInput,
      );
      let expected = {
        data: {
          id: '6c07f498-1713-4080-b959-3becd460e01e',
          message: 'Removed Successfully.',
        },
      };
      const received = receivedAPIResponse.data;
      expect(received).toEqual(expected);
    }, 10000);
  });
});
