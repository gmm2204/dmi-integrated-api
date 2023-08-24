import { Application } from "express";

import homeRoutes from "./home.routes";
import MortalityNCOVRoutes from "./mortality_ncov/main.route";
import AFIRoutes from "./afi/main.route";
import SARIILIRoutes from "./sari_ili/main.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/mortality_ncov", MortalityNCOVRoutes);
    app.use("/api/afi", AFIRoutes);
    app.use("/api/sari_ili", SARIILIRoutes);
  }
}
