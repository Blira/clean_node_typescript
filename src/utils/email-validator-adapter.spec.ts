import { EmailValidatorAdapter } from './email-validator-adapter';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('Email Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isaValid = sut.isValid('invalid_email@mail.com');
    expect(isaValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isaValid = sut.isValid('valid_email@mail.com');
    expect(isaValid).toBe(true);
  });

  test('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');

    sut.isValid('valid_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
