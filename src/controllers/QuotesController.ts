import * as Hapi from '@hapi/hapi';

import { AppGlobalVariableInterface } from '../interfaces/AppGlobalVariablesInterface';
import CommonCrudServiceImpl from '../services/CommonCrudServiceImpl';
import { Response } from '../classes/Response';
import { StatusCodes } from '../classes/StatusCodes';

export default class QuotesController {

    public globalVariables: AppGlobalVariableInterface;
    public serviceImpl: CommonCrudServiceImpl;
    public searchColumnName: string = 'message'

    constructor(server: Hapi.Server) {

        this.globalVariables = server['app']['globalVariables'];
        this.searchColumnName = 'name';
        this.serviceImpl = new CommonCrudServiceImpl(this.globalVariables.postgres, 't_quotes')
    }

    public async handleCreateEntry(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        let response: Response;

        try {

            response = await this.serviceImpl.createEntry(request.payload, []);
        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
        }
        return h.response(response).code(response.getStatusCode());
    }

    public async handleUpdateEntry(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        let response: Response;

        try {

            let condition = {};
            condition['id'] = request.params.id;

            response = await this.serviceImpl.updateEntry(condition, request.payload);
        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
        }
        return h.response(response).code(response.getStatusCode());
    }

    public async handleGetSingleEntry(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        let response: Response;

        try {

            let condition = {};
            condition['id'] = request.params['id'];
            condition['isDeleted'] = 0;
            response = await this.serviceImpl.getSingleEntry(condition);
        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
        }
        return h.response(response).code(response.getStatusCode());
    }


    public async handleGetAllEntries(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        let response: Response;

        try {

            let size = request.query['size'];
            let page = request.query['page'];
            let order = "id desc"
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

            response = await this.serviceImpl.getAllEntries(size, page, order, condition, searchQuery);

        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
        }
        return h.response(response).code(response.getStatusCode());
    }


    public async hanldeDeleteEntry(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        let response: Response;

        try {

            let condition = {};
            condition['id'] = request.params.id;

            let payload = {};
            payload['isDeleted'] = 1;

            response = await this.serviceImpl.deleteEntry(condition, payload);
        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
        }
        return h.response(response).code(response.getStatusCode());
    }

}
