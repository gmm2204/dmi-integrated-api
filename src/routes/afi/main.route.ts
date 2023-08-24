import { Router } from 'express';
import MainController from '../../controllers/afi/main.controller';
import * as RoutesData from '../../data/afi/routes.json';

class MainRoutes {
    router = Router();
    controller = new MainController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        RoutesData.routes.forEach(routeInstance => {
            this.router.get(routeInstance.url, this.controller.getData);
        });
    }
}

export default new MainRoutes().router;