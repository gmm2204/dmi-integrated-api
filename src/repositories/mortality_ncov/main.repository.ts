import { QueryTypes } from "sequelize";
import Database from "../../db/database";
import * as RoutesData from '../../data/mortality_ncov/routes.json';
import { config } from "../../config/db.config";

interface IMainRepository {
    readData(url: string): Promise<any[]>;
}

class MainRepository implements IMainRepository {
    db = new Database(config.DB);
    private retrievedData: any;

    async readData(url: string): Promise<any[]> {
        let route_query: string = ``;
        let route_found: boolean = false;

        RoutesData.routes.forEach(seekRoute => {
            if (seekRoute.url == url) {
                route_found = true;
                route_query = seekRoute.query;
            }
        });

        if ((route_found) && (route_query != "")) {
            this.retrievedData = await this.db.sequelize?.query<any[]>(route_query, {
                type: QueryTypes.SELECT,
            });
        } else {
            this.retrievedData = [{
                "message": "Unhandled request --> " + url
            }];
        }

        return this.retrievedData;
    }
}

export default new MainRepository