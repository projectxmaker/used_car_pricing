import { DBOptions } from "./db.datasourceoptions";
import { DataSourceOptions, DataSource } from "typeorm";

const dsOptions: DataSourceOptions = <DataSourceOptions>{};
Object.assign(dsOptions, DBOptions);
const AppDataSource = new DataSource(dsOptions);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export const dtSource = AppDataSource;