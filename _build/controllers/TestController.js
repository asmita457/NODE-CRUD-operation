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
const Response_1 = require("../classes/Response");
const StatusCodes_1 = require("../classes/StatusCodes");
class TestController {
    constructor(server) {
    }
    handleTestGetMethod(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, "", {});
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, "", {});
            }
            return h.response(response).code(200);
        });
    }
}
exports.default = TestController;
//# sourceMappingURL=TestController.js.map