import * as Hapi from '@hapi/hapi';
import { ServerConfigurationInterface } from './interfaces/ServerConfigurationInterface';
import { AppGlobalVariableInterface } from './interfaces/AppGlobalVariablesInterface';
import TestRoutes from './routes/TestRoutes';
import QuotesRoutes from './routes/QuotesRoutes';

export async function init(
    serverConfig: ServerConfigurationInterface,
    globalVariables: AppGlobalVariableInterface,
    myHost: string
): Promise<Hapi.Server> {

    try {

        const port = serverConfig.port;

        const server = new Hapi.Server({
            host: "0.0.0.0",
            port: port,
            router: {
                stripTrailingSlash: true,
            },
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                }
            },
            state: {
                strictHeader: false
            }
        });

        server.app['globalVariables'] = globalVariables;

        if (serverConfig.routePrefix) {
            server.realm.modifiers.route.prefix = serverConfig.routePrefix;
        }

        let hostString = myHost + ":" + port;


        const swaggeredPluginOptions = {
            info: {
                title: 'Array Pointer Backend Structure',
                description: 'ArrayPointer Backend Structure',
                version: '1.0.0',
            },
            swaggerUI: true,
            documentationPage: true,
            host: hostString,
            documentationPath: '/docs'
        }

        console.log("Swagger options", swaggeredPluginOptions);

        await server.register([
            require('inert'),
            require('vision'),
            {
                plugin: require('hapi-swagger'),
                options: swaggeredPluginOptions
            }
        ])

        // await Promise.all(pluginPromises);
        console.log('Register Routes');
        // bring your own validation function


        const validate = async function (decoded, request, h) {


            console.log("Decoded Data", decoded);

            return { isValid: true };

            // do your checks to see if the person is valid
            // if (!people[decoded.id]) {
            //     return { isValid: false };
            // }
            // else {
            //     return { isValid: true };
            // }
        };


        await server.register(require('hapi-auth-jwt2'));

        server.auth.strategy('jwt', 'jwt',
            {
                key: 'SecretKeyForJwtAuthentication',          // Never Share your secret key
                validate: validate,            // validate function defined above
                verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
            });

        server.auth.default('jwt');


        QuotesRoutes(server);
        TestRoutes(server);

        console.log('Routes registered sucessfully.');
        return server;
    } catch (err) {

        console.log('Error starting server: ', err);
        throw err;
    }
}
