import knex from '../database';
import { Request, Response, NextFunction } from 'express'

export default {

  async index(req: Request, res: Response, next: NextFunction){

    try {
      const { city, uf, items} = req.query;

      let parsedItem: any = [];

      if(items){
      parsedItem = String(items)
        .split(',')
        .map(item => Number(item.trim()));
      }

      const points = await knex('points')
        .join('points_items', 'points.id', '=', 'points_items.point_id')
        .whereIn('points_items.item_id', parsedItem)
        .where('city', String(city))
        .where('UF', String(uf))
        .distinct()
        .select('points.*');
  
      return res.json(points) 
    } catch (error) {
      next(error)
    }
  },

  async show(req: Request, res: Response, next: NextFunction){
    try {
      const { id } = req.params;

      const point = await knex('points').where('id', id).first();

      if(!point){
        res.status(404).json('Point not found');
      }

      const items = await knex('items')
        .join('points_items', 'items.id', '=', 'points_items.item_id')
        .where('points_items.point_id', id)
        .select('items.title')

      return res.json({ point, items });
    } catch (error) {
      next(error)
    }
  },

  async store(req: Request, res: Response, next: NextFunction){
    
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        UF,
        items
      } = req.body;

      const trx = await knex.transaction();
      
      const ids = await trx('points').insert({
        image: req.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        UF,
      })
      .returning('id');


      const pointItems = items
        .split(',')
        .map((item:string) => Number(item.trim()))
        .map((item_id: number) => {
          return{
            point_id: ids[0],
            item_id,
          }
        });

      await trx('points_items').insert(pointItems);

      await trx.commit();

      return res.json({ success: true}) 
    } catch (error) {
      next(error)
    }
  },
}