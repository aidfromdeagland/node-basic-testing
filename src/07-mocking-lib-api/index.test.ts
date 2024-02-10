import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.mock('axios', () => {
      return {
        ...jest.requireActual('axios'),
        create: () => ({}),
      };
    });

    jest.useFakeTimers();
  });

  let axiosClientGetMock: jest.SpyInstance;
  let axiosCreateMock: jest.SpyInstance;

  beforeEach(() => {
    axiosClientGetMock = jest.fn(() => Promise.resolve({ data: 'some data' }));
    axiosCreateMock = jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: axiosClientGetMock } as unknown as AxiosInstance);

    jest.runOnlyPendingTimers();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('some-path');
    jest.runOnlyPendingTimers();

    expect(axiosCreateMock).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('some-path');

    expect(axiosClientGetMock).toBeCalledWith('some-path');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('some-path');

    expect(result).toEqual('some data');
  });
});
