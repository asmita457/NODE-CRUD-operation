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
const CommonCrudServiceImpl_1 = require("../services/CommonCrudServiceImpl");
const Response_1 = require("../classes/Response");
const StatusCodes_1 = require("../classes/StatusCodes");
class QuotesController {
    constructor(server) {
        this.searchColumnName = 'message';
        this.globalVariables = server['app']['globalVariables'];
        this.searchColumnName = 'name';
        this.serviceImpl = new CommonCrudServiceImpl_1.default(this.globalVariables.postgres, 't_quotes');
    }
    handleCreateEntry(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield this.serviceImpl.createEntry(request.payload, []);
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
            }
            return h.response(response).code(response.getStatusCode());
        });
    }
    handleUpdateEntry(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let condition = {};
                condition['id'] = request.params.id;
                response = yield this.serviceImpl.updateEntry(condition, request.payload);
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
            }
            return h.response(response).code(response.getStatusCode());
        });
    }
    handleGetSingleEntry(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let condition = {};
                condition['id'] = request.params['id'];
                condition['isDeleted'] = 0;
                response = yield this.serviceImpl.getSingleEntry(condition);
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
            }
            return h.response(response).code(response.getStatusCode());
        });
    }
    handleGetAllEntries(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let size = request.query['size'];
                let page = request.query['page'];
                let order = "id desc";
                let searchQuery = "true";
                let condition = {};
                let filters = request.query['filters'];
                if (filters != undefined) {
                    let filterKeys = Object.keys(filters);
                    for (let i = 0; i < filterKeys.length; i++) {
                        condition[filterKeys[i]] = filters[filterKeys[i]];
                    }
                }
                if (request.query['search'] != undefined) {
                    searchQuery = this.searchColumnName + "Like '%" + request.query['search'] + "%'";
                }
                condition['isDeleted'] = 0;
                response = yield this.serviceImpl.getAllEntries(size, page, order, condition, searchQuery);
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
            }
            return h.response(response).code(response.getStatusCode());
        });
    }
    hanldeDeleteEntry(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let condition = {};
                condition['id'] = request.params.id;
                let payload = {};
                payload['isDeleted'] = 1;
                response = yield this.serviceImpl.deleteEntry(condition, payload);
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
            }
            return h.response(response).code(response.getStatusCode());
        });
    }
}
exports.default = QuotesController;
//# sourceMappingURL=QuotesController.js.map