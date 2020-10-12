import {Request, Response} from 'express';


export default class TesteController{
    async teste(req:Request, resp:Response){
        console.log(req)
        return resp.json('integração feita!')
    }
}