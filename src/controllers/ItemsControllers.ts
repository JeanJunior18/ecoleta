import knex from '../database';

export default {
  async index(req: any, res: any){
    const items = await knex('items').select('*')

    const serializedItems = items.map(item => {
      return { 
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
       }
    })

    return res.json(serializedItems)
  }
}