import { Router } from 'express';
import MainController from '../../controllers/mortality_ncov/main.controller';
import * as RoutesData from '../../data/mortality_ncov/routes.json';

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