import {
  AddAccount,
  AccountModel,
  AddAccountModel,
  Encrypter,
} from './db-add-acocunt-protocols';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return await new Promise(resolve => resolve(null));
  }
}
