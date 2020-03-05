"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("@hapi/hapi");
const TestRoutes_1 = require("./routes/TestRoutes");
const QuotesRoutes_1 = require("./routes/QuotesRoutes");
function init(serverConfig, globalVariables, myHost) {
    return __awaiter(this, void 0, void 0, function* () {
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
            };
            console.log("Swagger options", swaggeredPluginOptions);
            yield server.register([
                require('inert'),
                require('vision'),
                {
                    plugin: require('hapi-swagger'),
                    options: swaggeredPluginOptions
                }
            ]);
            // await Promise.all(pluginPromises);
            console.log('Register Routes');
            // bring your own validation function
            const validate = function (decoded, request, h) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("Decoded Data", decoded);
                    return { isValid: true };
                    // do your checks to see if the person is valid
                    // if (!people[decoded.id]) {
                    //     return { isValid: false };
                    // }
                    // else {
                    //     return { isValid: true };
                    // }
                });
            };
            yield server.register(require('hapi-auth-jwt2'));
            server.auth.strategy('jwt', 'jwt', {
                key: 'SecretKeyForJwtAuthentication',
                validate: validate,
                verifyOptions: { algorithms: ['HS256'] },
            });
            server.auth.default('jwt');
            QuotesRoutes_1.default(server);
            TestRoutes_1.default(server);
            console.log('Routes registered sucessfully.');
            return server;
        }
        catch (err) {
            console.log('Error starting server: ', err);
            throw err;
        }
    });
}
exports.init = init;
//# sourceMappingURL=server.js.map