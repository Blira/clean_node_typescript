import { EmailValidatorAdapter } from './email-validator-adapter';

describe('Email Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    const isaValid = sut.isValid('invalid_email@mail.com');
    expect(isaValid).toBe(false);
  });
});
