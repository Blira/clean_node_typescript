import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve(value));
    }
  }
  return new EncrypterStub();
};
interface SutTypes {
  encrypterStub: Encrypter;
  sut: DbAddAccount;
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);
  return {
    encrypterStub,
    sut,
  };
};
describe('DbAddAccount Usecase', () => {
  test('Should call Ecrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });
});
