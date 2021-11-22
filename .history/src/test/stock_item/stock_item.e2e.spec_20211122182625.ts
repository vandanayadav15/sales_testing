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
const stockItemData = {
  data: {
    id: ' ',
    name: 'vv',
    brand: 'vv',
    defaultPrice: '10.11',
    description: 'vv',
    active: true,
  },
};
describe('/save (POST)', () => {
  test('Assert if a new itemList can be created with mandatory details', async () => {
    const receivedAPIResponse = await axiosAPIClient.post(
      'stockItem/save',
      stockItemData,
    );
    let expected = {
      data: {
        id: 'ab6ffb3c-6744-4454-affb-2b936fba6d98',
        message: 'Saved Successfully.',
      },
    };
    const received = receivedAPIResponse.data;
    expect(received).toMatchObject(expected);
  }, 10000);
  test('Assert if a new itemList can be created without mandatory details', async () => {
    let expected = {
      data: {
        id: 'ab6ffb3c-6744-4454-affb-2b936fba6d98',
        message: 'Saved Successfully.',
      },
    };
    const receivedAPIResponse = await axiosAPIClient.post(
      'stockItem/save',
      stockItemData,
    );
    const received = receivedAPIResponse.data;
    if (received.error) {
      throw new Error('id is mandatory' + received.error.message);
    } else {
      expect(received).toMatchObject(expected);
    }
  });

  describe('/update (PUT)', () => {
    test('Should update details', async () => {
      const receivedAPIResponse = await axiosAPIClient.put(
        'stockItem/update',
        stockItemData,
      );
      let expected = {
        data: {
          message: 'Saved Successfully.',
        },
      };
      const received = receivedAPIResponse.data;
      expect(received).toMatchObject(expected);
    }, 10000);
  });
});
