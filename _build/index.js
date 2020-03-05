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
const Configs = require("./configurations");
const Server = require("./server");
const knex = require("knex");
console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);
// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.message}`);
});
// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(`unhandledRejection ${reason}`);
});
let confgis = Configs.getConfigurations();
const start = ({ config, globalVariables, myHost }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = yield Server.init(config, globalVariables, myHost);
        yield server.start();
        console.log('Server running at:', server.info.uri);
    }
    catch (err) {
        console.error('Error starting server: ', err.message);
        throw err;
    }
});
let globalVariables = {};
globalVariables.postgres = knex(confgis.postgresConfig);
globalVariables.externalUrls = confgis.externalUrls;
globalVariables.awsS3 = confgis.awsS3;
start({
    config: confgis.serverConfig,
    globalVariables: globalVariables,
    myHost: confgis.myHost
});
//# sourceMappingURL=index.js.map