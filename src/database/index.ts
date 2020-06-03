import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'pg',
  connection: {
    database: 'next_level',
    user: 'postgres',
    password: 'postgres',
  },
})

export default connection