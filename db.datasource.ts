import { DBOptions } from "./db.datasourceoptions";
import { DataSourceOptions, DataSource } from "typeorm";

const dsOptions: DataSourceOptions = <DataSourceOptions>{};
Object.assign(dsOptions, DBOptions);

const _AppDataSource = new DataSource(dsOptions);

_AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export const AppDataSource = _AppDataSource;