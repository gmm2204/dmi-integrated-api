import { Router } from 'express';
import MainController from '../../controllers/cholera/main.controller';
import * as RoutesData from '../../data/cholera/routes.json';

class MainRoutes {
    router = Router();
    controller = new MainController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        RoutesData.routes.forEach(routeInstance => {
            this.router.post(routeInstance.url, this.controller.getData);
        });
    }
}

export default new MainRoutes().router;