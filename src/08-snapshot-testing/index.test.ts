import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = ['fe', 'pb', 'ag', 'au'];
    const expectedList = {
      value: 'fe',
      next: {
        value: 'pb',
        next: {
          value: 'ag',
          next: {
            value: 'au',
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };

    expect(generateLinkedList(values)).toStrictEqual(expectedList);
  });

  test('should generate linked list from values 2', () => {
    const values = ['fe', 'pb', 'ag', 'au'];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
