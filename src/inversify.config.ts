import TYPES from "./types";

import { Container } from "inversify";
import { Context } from "./infrastructure/context";
import { IRoutedController } from "./infrastructure/controller";
import { DeviceCategoriesController } from "./controllers/device-categories";
import Config from "./config";

let container = new Container();

container.bind<Context>(TYPES.Context).to(Context);
container.bind<Config>(TYPES.Config).to(Config);

container.bind<IRoutedController>(TYPES.Controller).to(DeviceCategoriesController);

export default container;