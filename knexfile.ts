import path from 'path';
module.exports = {
  client: 'pg',
  connection: {
    database: 'next_level',
    user: 'postgres',
    password: 'postgres',
  },
  migrations:{ 
    directory: path.resolve(__dirname,'src','database' , 'migrations')
  },
  seeds:{ 
    directory: path.resolve(__dirname,'src','database' , 'seeds')
  },
  useNullAsDefault:true,
}