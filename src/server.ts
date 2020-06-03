import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads' )))
  .use(routes)

  .use((error: any, req: any, res: any, next: any)=>{
    res.status(error.status || 500);
    res.json({error: error.message})
  })

  .listen(3333, ()=>{console.log('Online on 3333')});
