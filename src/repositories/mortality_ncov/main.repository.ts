import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import Database from "../../db/database";
import * as RoutesData from '../../data/mortality_ncov/routes.json';
import { config } from "../../config/db.config";
import { DataFilter } from "../../models/DataFilter.model";

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

    async acquirePostData(req: Request): Promise<any[]> {
        let url = req.url;
        let targetRoute: {} = {};
        let route_query: string = ``;
        let route_filter_query: string = ``;
        let route_found: boolean = false;
        let filterInstance = new DataFilter(req.body);

        //#region Compile filters
        if (filterInstance.filter_facility != "-1") {
            if (route_filter_query != ``) {
                route_filter_query += ' AND '
            }

            route_filter_query += ` p.Facility = '` + filterInstance.filter_facility + `' `;
        }

        if ((filterInstance.filter_date_range_start != "-1") && (filterInstance.filter_date_range_end != "-1")) {
            if (route_filter_query != ``) {
                route_filter_query += ' AND '
            }

            route_filter_query += ` (d.Date BETWEEN '` + filterInstance.filter_date_range_start + `' AND '` + filterInstance.filter_date_range_end + `')`;
        }

        if (filterInstance.filter_year != "-1") {
            if (route_filter_query != ``) {
                route_filter_query += ' AND '
            }

            route_filter_query += ` d.Year = '` + filterInstance.filter_year + `' `;
        }

        if ((filterInstance.filter_epi_week_start != "-1") && (filterInstance.filter_epi_week_end != "-1")) {
            if (route_filter_query != ``) {
                route_filter_query += ' AND '
            }

            route_filter_query += ` (p.EpiWeek BETWEEN ` + filterInstance.filter_epi_week_start + ` AND ` + filterInstance.filter_epi_week_end + `) `;
        }

        if (route_filter_query != ``) {
            route_filter_query = ` WHERE (` + route_filter_query + `);`;
        }
        //#endregion

        RoutesData.routes.forEach(seekRoute => {
            if (seekRoute.url == url) {
                targetRoute = seekRoute;
                route_found = true;
                route_query = seekRoute.query;

                if (seekRoute.filter) {
                    route_query += route_filter_query

                    console.log("---------------------------------------");
                    console.log(route_query);
                    console.log("---------------------------------------");
                }
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