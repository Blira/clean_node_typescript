import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helpers';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const insertResult = await accountCollection.insertOne(accountData);
    const { _id, ...accountWithoutId } = insertResult.ops[0];
    const account = {
      ...accountWithoutId,
      id: _id,
    };
    return account;
  }
}
