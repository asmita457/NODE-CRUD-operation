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
const StatusCodes_1 = require("../classes/StatusCodes");
const Response_1 = require("../classes/Response");
const TestController_1 = require("../controllers/TestController");
function default_1(server) {
    const testController = new TestController_1.default(server);
    server.bind(testController);
    server.route({
        method: 'GET',
        path: '/test',
        options: {
            handler: testController.handleTestGetMethod,
            tags: ['api'],
            description: 'Test Method',
            auth: false,
            validate: {
                // query: {},
                // params: {},
                // payload: {},
                failAction: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        let response = new Response_1.Response(false, StatusCodes_1.StatusCodes.NOT_ACCEPTABLE, err.message, {});
                        return h.response(response).code(response.getStatusCode()).takeover();
                    }
                    else {
                    }
                })
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=TestRoutes.js.map