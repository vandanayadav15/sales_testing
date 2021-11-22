export let title: string = 'TITLE';
export let port: number = 5000;
export let swaggerVersion: string = '3.0';
export const dbOptions: any = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'testing',
  logging: true,
  synchronize: false,
  entities: [__dirname + '/../modules/**/*{entity.ts,entity.js}'],
};
export const setEnvConfig = () => {
  let envData: any = process.env.ENV_TEST;
  if (envData) {
    envData = JSON.parse(envData);
    if (envData.dbHost) {
      dbOptions.host = envData.dbHost;
      dbOptions.port = envData.dbPort;
      dbOptions.username = envData.dbUser;
      dbOptions.password = envData.dbPassword;
      dbOptions.database = envData.dbDatabase;
    }
  }
};
