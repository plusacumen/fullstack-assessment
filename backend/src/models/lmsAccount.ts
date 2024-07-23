import { v4 as uuidv4 } from "uuid";
import database from "../utils/database";

class LMSAccount {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(email: string, firstName: string, lastName: string) {
    this.accountId = uuidv4();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static create(
    email: string,
    firstName: string,
    lastName: string
  ): LMSAccount {
    const account = new LMSAccount(email, firstName, lastName);
    database.lmsAccounts[email] = account;
    return account;
  }
}

export default LMSAccount;
