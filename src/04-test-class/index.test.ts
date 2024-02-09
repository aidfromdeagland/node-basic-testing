import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let sourceAccount: BankAccount;
  let targetAccount: BankAccount;

  beforeEach(() => {
    sourceAccount = getBankAccount(0);
    targetAccount = getBankAccount(0);
  });

  test('should create account with initial balance', () => {
    expect(sourceAccount.getBalance()).toEqual(0);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    sourceAccount.deposit(20);

    expect(() => {
      sourceAccount.withdraw(50);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    sourceAccount.deposit(20);

    expect(() => {
      sourceAccount.transfer(50, targetAccount);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    sourceAccount.deposit(20);

    expect(() => {
      sourceAccount.transfer(10, sourceAccount);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    sourceAccount.deposit(20);

    expect(sourceAccount.getBalance()).toEqual(20);
  });

  test('should withdraw money', () => {
    sourceAccount.deposit(20);
    sourceAccount.withdraw(10);

    expect(sourceAccount.getBalance()).toEqual(10);
  });

  test('should transfer money', () => {
    sourceAccount.deposit(30);
    sourceAccount.transfer(10, targetAccount);

    expect(sourceAccount.getBalance()).toEqual(20);
    expect(targetAccount.getBalance()).toEqual(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await sourceAccount.fetchBalance();
    if (typeof balance !== null) {
      expect(Number.isInteger(balance)).toBeTruthy;
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(sourceAccount, 'fetchBalance').mockResolvedValue(30);

    await sourceAccount.synchronizeBalance();

    expect(sourceAccount.getBalance()).toEqual(30);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(sourceAccount, 'fetchBalance').mockResolvedValue(null);

    expect(() => {
      return sourceAccount.synchronizeBalance();
    }).rejects.toThrowError(SynchronizationFailedError);
  });
});
