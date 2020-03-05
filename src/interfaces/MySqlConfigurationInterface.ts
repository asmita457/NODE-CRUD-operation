import { MySqlConnectionConfigurationInterface } from "./MySqlConnectionConfigurationInterface";

export interface MySqlConfigurationInterface {
    client: string,
    connection: MySqlConnectionConfigurationInterface
}
