import { ServerConfigurationInterface } from "./ServerConfigurationInterface";
import { PostgresConfigInterface } from "./PostgresConfigInterface";
import { MySqlConfigurationInterface } from "./MySqlConfigurationInterface";
import { MongoConfigurationInterface } from "./MongoConfigurationInterface";

export interface ConfigurationSettingsInterface {

    serverConfig: ServerConfigurationInterface,

    postgresConfig: PostgresConfigInterface,

    mongoConfig: MongoConfigurationInterface,

    mySqlConfig: MySqlConfigurationInterface,

    mailConfig,

    externalUrls: any;

    myHost: string;

    awsS3: string;

    extraData: any;

}
