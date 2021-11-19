import { Test } from '@nestjs/testing';
let axios = require('axios');
let axiosAPIClient;
//Thia is a Json OBj that contains base URL of the ledgur server
const axiosConfig = {
  baseURL: `http://localhost:5005/`,
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
      }
