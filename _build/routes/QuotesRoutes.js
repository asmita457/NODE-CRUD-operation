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
const QuotesController_1 = require("../controllers/QuotesController");
const CommonValidations_1 = require("../validations/CommonValidations");
function default_1(server) {
    const version = "v1.0.0";
    const controller = new QuotesController_1.default(server);
    server.bind(controller);
    let isAuthRequired = false;
    let resourceName = 'quotes';
    server.route([
        {
            method: 'POST',
            path: '/' + version + "/" + resourceName,
            options: {
                handler: controller.handleCreateEntry,
                description: 'Create Quotes Entry',
                tags: ['api'],
                auth: isAuthRequired,
                validate: {
                    payload: CommonValidations_1.quoteCreateUpdateValidateObject,
                    failAction: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            let response = new Response_1.Response(false, StatusCodes_1.StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }
                        return h.continue;
                    })
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '201': [],
                            '406': {
                                'description': 'Validation Error.'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/' + version + "/" + resourceName,
            options: {
                handler: controller.handleGetAllEntries,
                description: 'Get All Entries for Tankers',
                tags: ['api'],
                auth: isAuthRequired,
                validate: {
                    query: CommonValidations_1.getAllApiQueryParams,
                    failAction: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            let response = new Response_1.Response(false, StatusCodes_1.StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }
                        return h.continue;
                    })
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '201': [],
                            '406': {
                                'description': 'Validation Error.'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/' + version + "/" + resourceName + "/{id}",
            options: {
                handler: controller.handleGetSingleEntry,
                description: 'Get Single Entry for Tanker',
                tags: ['api'],
                auth: isAuthRequired,
                validate: {
                    params: CommonValidations_1.idInParams,
                    failAction: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            let response = new Response_1.Response(false, StatusCodes_1.StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }
                        return h.continue;
                    })
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '201': [],
                            '406': {
                                'description': 'Validation Error.'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'PUT',
            path: '/' + version + "/" + resourceName + "/{id}",
            options: {
                handler: controller.handleUpdateEntry,
                description: 'update Single Entry of Tanker',
                tags: ['api'],
                auth: isAuthRequired,
                validate: {
                    params: CommonValidations_1.idInParams,
                    payload: CommonValidations_1.quoteCreateUpdateValidateObject,
                    failAction: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            let response = new Response_1.Response(false, StatusCodes_1.StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }
                        return h.continue;
                    })
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '201': [],
                            '406': {
                                'description': 'Validation Error.'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/' + version + "/" + resourceName + "/{id}",
            options: {
                handler: controller.hanldeDeleteEntry,
                description: 'Delete Single Entry of Tanker',
                tags: ['api'],
                auth: isAuthRequired,
                validate: {
                    params: CommonValidations_1.idInParams,
                    failAction: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            let response = new Response_1.Response(false, StatusCodes_1.StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }
                        return h.continue;
                    })
                },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '201': [],
                            '406': {
                                'description': 'Validation Error.'
                            }
                        }
                    }
                }
            }
        },
    ]);
}
exports.default = default_1;
//# sourceMappingURL=QuotesRoutes.js.map