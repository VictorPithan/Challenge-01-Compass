import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'social-media',
  synchronize: true,
  entities: [],
  migrations: [
    join(__dirname, '..', '..', '**', 'database/migrations/*.{ts,js}')
  ]
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
