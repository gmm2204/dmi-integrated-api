import { Router } from 'express';
import MainController from '../../controllers/sari_ili/main.controller';
import * as RoutesData from '../../data/sari_ili/routes.json';

class MainRoutes {
    router = Router();
    controller = new MainController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        RoutesData.routes.forEach(routeInstance => {
            this.router.post(routeInstance.url, this.controller.postData);
        });
    }
}

export default new MainRoutes().router;