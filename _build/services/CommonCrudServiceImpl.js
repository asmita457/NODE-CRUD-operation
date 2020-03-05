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
const humps_1 = require("humps");
const R = require("ramda");
const CustomMessages_1 = require("../classes/CustomMessages");
const StatusCodes_1 = require("../classes/StatusCodes");
// Create, Validate, Update, Pagination, Search and Filtering 
class CommonCrudServiceImpl {
    constructor(postgres, tableName) {
        this.postgres = postgres;
        this.tableName = tableName;
    }
    // Unique Checking if index is there
    // Db Exception handling 
    // Response Format
    createEntry(payload, uniqeColumns) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let condition = {};
                let isEntryPresent = 0;
                if (uniqeColumns.length != 0) {
                    for (let i = 0; i < uniqeColumns.length; i++) {
                        if (payload[uniqeColumns[i]] != undefined)
                            condition[uniqeColumns[i]] = payload[uniqeColumns[i]];
                    }
                    isEntryPresent = yield this.postgres(this.tableName).first().where(humps_1.decamelizeKeys(condition));
                }
                if (isEntryPresent) {
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.BAD_REQUEST, CustomMessages_1.CustomMessages.ENTRY_ALREADY_PRESENT, {});
                }
                else {
                    payload['created'] = new Date();
                    payload['modified'] = new Date();
                    let result = yield this.postgres(this.tableName).returning("*").insert(humps_1.decamelizeKeys(payload)).then(R.map(humps_1.camelizeKeys));
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.CREATED, CustomMessages_1.CustomMessages.ENTRY_CREATED_SUCCESSFULLY, result[0]);
                }
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
            }
            return response;
        });
    }
    // Update Multiple Entries
    updateEntry(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let isEntryPresent = yield this.postgres(this.tableName).first().where(humps_1.decamelizeKeys(condition));
                if (!isEntryPresent) {
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.BAD_REQUEST, CustomMessages_1.CustomMessages.ENTRY_NOT_PRESENT, {});
                }
                else {
                    payload['modified'] = new Date();
                    let result = yield this.postgres(this.tableName).returning("*").where(humps_1.decamelizeKeys(condition)).update(humps_1.decamelizeKeys(payload))
                        .then(R.map(humps_1.camelizeKeys));
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, CustomMessages_1.CustomMessages.ENTRY_UPDATED_SUCCESSFULLY, result);
                }
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
            }
            return response;
        });
    }
    // Get Single Entry
    getSingleEntry(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let result = yield this.postgres(this.tableName).first("*")
                    .where(humps_1.decamelizeKeys(condition))
                    .then(humps_1.camelizeKeys);
                if (!result) {
                    response = new Response_1.Response(false, StatusCodes_1.StatusCodes.BAD_REQUEST, CustomMessages_1.CustomMessages.ENTRY_NOT_PRESENT, {});
                }
                else {
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, CustomMessages_1.CustomMessages.SUCCESS, result);
                }
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
            }
            return response;
        });
    }
    // Get All Entries
    // Remove columns from filters / Search which are not in db 
    // Camalize the response before sending 
    getAllEntries(size, page, orderByString, filterCondition, rawSearchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let result = yield this.postgres(this.tableName).select("*")
                    .where(humps_1.decamelizeKeys(filterCondition))
                    .whereRaw(rawSearchQuery)
                    .limit(size)
                    .offset((page * size))
                    .orderByRaw(orderByString)
                    .then(R.map(humps_1.camelizeKeys));
                let countObj = yield this.postgres(this.tableName)
                    .where(humps_1.decamelizeKeys(filterCondition))
                    .whereRaw(rawSearchQuery)
                    .count('* as cnt');
                let finalObj = {
                    "list": result,
                    "count": countObj[0]['cnt']
                };
                response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, CustomMessages_1.CustomMessages.SUCCESS, finalObj);
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
            }
            return response;
        });
    }
    createOrUpdateMultipleEntries(array, columnArray) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                for (let i = 0; i < array.length; i++) {
                    let payload = array[i];
                    let condition = {};
                    for (let j = 0; j < columnArray.length; j++) {
                        condition[columnArray[j]] = payload[columnArray[j]];
                    }
                    payload['modified'] = new Date();
                    console.log("Payload", payload);
                    console.log("Condition", condition);
                    let checkEntry = yield this.postgres(this.tableName).first().where(humps_1.decamelizeKeys(condition));
                    if (checkEntry) {
                        let result = yield this.postgres(this.tableName).returning("*").where(humps_1.decamelizeKeys(condition)).update(humps_1.decamelizeKeys(payload))
                            .then(R.map(humps_1.camelizeKeys));
                        response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, CustomMessages_1.CustomMessages.ENTRY_UPDATED_SUCCESSFULLY, result);
                    }
                    else {
                        if (payload['id'] == 0) {
                            delete payload['id'];
                        }
                        payload['created'] = new Date();
                        payload['modified'] = new Date();
                        let result = yield this.postgres(this.tableName).insert(humps_1.decamelizeKeys(payload)).returning("*").then(R.map(humps_1.camelizeKeys));
                        response = new Response_1.Response(true, StatusCodes_1.StatusCodes.CREATED, CustomMessages_1.CustomMessages.ENTRY_CREATED_SUCCESSFULLY, result);
                    }
                }
            }
            catch (err) {
                console.log(err.message);
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
            }
            return response;
        });
    }
    // Get All Entries
    // Remove columns from filters / Search which are not in db 
    // Camalize the response before sending 
    getAllEntriesArray(filterCondition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.postgres(this.tableName).select("*")
                    .where(humps_1.decamelizeKeys(filterCondition))
                    .then(R.map(humps_1.camelizeKeys));
            }
            catch (err) {
                return [];
            }
        });
    }
    // Delete Entries
    deleteEntry(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let isEntryPresent = yield this.postgres(this.tableName).first().where(humps_1.decamelizeKeys(condition));
                if (!isEntryPresent) {
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.BAD_REQUEST, CustomMessages_1.CustomMessages.ENTRY_NOT_PRESENT, {});
                }
                else {
                    payload['modified'] = new Date();
                    let result = yield this.postgres(this.tableName).returning("*").where(humps_1.decamelizeKeys(condition)).update(humps_1.decamelizeKeys(payload))
                        .then(R.map(humps_1.camelizeKeys));
                    response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, CustomMessages_1.CustomMessages.ENTRY_DELETED_SUCCESSFULLY, result);
                }
            }
            catch (err) {
                response = new Response_1.Response(false, StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
            }
            return response;
        });
    }
}
exports.default = CommonCrudServiceImpl;
//# sourceMappingURL=CommonCrudServiceImpl.js.map