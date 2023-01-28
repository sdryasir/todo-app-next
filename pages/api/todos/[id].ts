import {deleteTodo, getTodoById} from '../../../config/prisma/todos'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    const id = req.query.id!;
    if (req.method === 'GET') {
        const data = await getTodoById(id as string);
        console.log(data);
        
        if (!data) {
            res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ todo: data });
    } 
    //else if (req.method === 'PUT') {
    //     const customer: Customer = {
    //         name: req.body.name,
    //         industry: req.body.industry,
    //         orders: req.body.orders.map((order: Order) => {
    //             return { ...order, _id: new ObjectId() };
    //         }),
    //     };

    //     const data = await editCustomer(id as string, customer);

    //     res.status(200).json({ modifiedCount: data.modifiedCount });
    // } else 
    if (req.method === 'DELETE') {
        const response = await deleteTodo(id as string);
        res.status(200).json(response);
    }
};