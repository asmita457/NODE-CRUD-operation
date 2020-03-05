import * as Hapi from '@hapi/hapi';
import { StatusCodes } from "../classes/StatusCodes";
import { Response } from "../classes/Response";
import QuotesController from '../controllers/QuotesController';
import { quoteCreateUpdateValidateObject, quoteLikeValidationObject, getAllApiQueryParams, idInParams } from '../validations/CommonValidations';

export default function (server: Hapi.Server) {

    const version = "v1.0.0"
    const controller = new QuotesController(server);
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
                tags: ['api'], // ADD THIS TAG
                auth: isAuthRequired,
                validate: {
                    payload: quoteCreateUpdateValidateObject,
                    failAction: async (request, h, err) => {

                        if (err) {
                            let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }

                        return h.continue;
                    }
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
                tags: ['api'], // ADD THIS TAG
                auth: isAuthRequired,
                validate: {
                    query: getAllApiQueryParams,
                    failAction: async (request, h, err) => {

                        if (err) {
                            let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }

                        return h.continue;
                    }
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
                tags: ['api'], // ADD THIS TAG
                auth: isAuthRequired,
                validate: {
                    params: idInParams,
                    failAction: async (request, h, err) => {

                        if (err) {
                            let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }

                        return h.continue;
                    }
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
                tags: ['api'], // ADD THIS TAG
                auth: isAuthRequired,
                validate: {
                    params: idInParams,
                    payload: quoteCreateUpdateValidateObject,
                    failAction: async (request, h, err) => {

                        if (err) {
                            let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }

                        return h.continue;
                    }
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
                tags: ['api'], // ADD THIS TAG
                auth: isAuthRequired,
                validate: {
                    params: idInParams,
                    failAction: async (request, h, err) => {

                        if (err) {
                            let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                            return h.response(response).code(response.getStatusCode()).takeover();
                        }

                        return h.continue;
                    }
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