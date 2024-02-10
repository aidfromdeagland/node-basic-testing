// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('mocking-node-api tests', () => {
  let callback: () => void;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('doStuffByTimeout', () => {
    test('should set timeout with provided callback and timeout', () => {
      doStuffByTimeout(callback, 500);

      expect(setTimeout).toBeCalledWith(callback, 500);
    });

    test('should call callback only after timeout', () => {
      doStuffByTimeout(callback, 500);

      jest.advanceTimersByTime(499);
      expect(callback).not.toBeCalled;
      jest.advanceTimersByTime(1);
      expect(callback).toBeCalled;
    });
  });

  describe('doStuffByInterval', () => {
    test('should set interval with provided callback and timeout', () => {
      doStuffByInterval(callback, 500);

      expect(setInterval).toBeCalledWith(callback, 500);
    });

    test('should call callback multiple times after multiple intervals', () => {
      doStuffByInterval(callback, 500);

      jest.advanceTimersByTime(500);
      expect(callback).toBeCalledTimes(1);
      jest.advanceTimersByTime(500);
      expect(callback).toBeCalledTimes(2);
      jest.advanceTimersByTime(500);
      expect(callback).toBeCalledTimes(3);
    });
  });

  describe('readFileAsynchronously', () => {
    test('should call join with pathToFile', async () => {
      jest.spyOn(path, 'join');

      await readFileAsynchronously('./some-file.txt');

      expect(path.join).toBeCalledWith(expect.any(String), './some-file.txt');
    });

    test('should return null if file does not exist', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      const result = await readFileAsynchronously('./some-file.txt');

      expect(result).toEqual(null);
    });

    test('should return file content if file exists', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest
        .spyOn(fsPromises, 'readFile')
        .mockResolvedValue(Buffer.from('lorem ipsum'));

      const result = await readFileAsynchronously('./some-file.txt');

      expect(result).toEqual('lorem ipsum');
    });
  });
});
