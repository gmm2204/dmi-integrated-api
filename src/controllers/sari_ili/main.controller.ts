import { Request, Response } from "express";
import mainRepository from "../../repositories/sari_ili/main.repository";

export default class MainController {
    async getData(req: Request, res: Response) {
        try {
            let dataInstance: any;
            dataInstance = await mainRepository.readData(req.url);
            res.status(200).send(dataInstance);
        }
        catch (err) {
            res.status(500).send({
                message: "An error has occured here --> " + req.url
            });
        }
    }
}