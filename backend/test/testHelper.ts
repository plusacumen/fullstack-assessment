import database from "../src/utils/database";

export const resetLMSDatabase = (): void => {
  database.lmsAccounts = {};
};
