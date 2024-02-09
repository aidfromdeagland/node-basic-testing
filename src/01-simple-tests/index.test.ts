import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Add })).toEqual(9);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Subtract })).toEqual(
      3,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Multiply })).toEqual(
      18,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 6, b: 3, action: Action.Exponentiate }),
    ).toEqual(216);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: 'doit!' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '6', b: 3, action: Action.Multiply })).toEqual(
      null,
    );
  });
});
