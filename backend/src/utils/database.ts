interface Database {
  lmsAccounts: { [key: string]: any };
}

const database: Database = {
  lmsAccounts: {},
};

export default database;
