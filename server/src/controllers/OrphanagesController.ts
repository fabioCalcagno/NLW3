import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import  Orphanage  from '../models/Orphanage';
import OrphanageView from '../views/orphanage_views'


export default {

    async findById(req:Request, res:Response){
        const {id} = req.params;
        const orphanageRepository = getRepository(Orphanage);
        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(OrphanageView.render(orphanage));
    },
    async index(req:Request, res:Response){
        const orphanageRepository = getRepository(Orphanage);
        const orphanages = await orphanageRepository.find({
            relations: ['images']
        });

        return res.json(OrphanageView.renderMany(orphanages));
    },

    async create(req:Request, res:Response){

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body;

        const orphanageRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image =>{
            return {path: image.filename}
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        data.open_on_weekends = data.open_on_weekends === 'true' ?  true  : false;

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const orphanage = orphanageRepository.create(data);

        await orphanageRepository.save(orphanage)
        return res.status(201).json({message:"Orfanato adicionado com sucesso!"});
    }
}