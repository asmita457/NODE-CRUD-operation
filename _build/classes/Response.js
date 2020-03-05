"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(isSuccess, statusCodes, message, result) {
        this.statusCode = statusCodes;
        this.message = message;
        this.result = result;
        this.isSuccess = isSuccess;
    }
    getIsSuccess() {
        return this.isSuccess;
    }
    getMessage() {
        return this.message;
    }
    getStatusCode() {
        return this.statusCode;
    }
    getResult() {
        return this.result;
    }
    setResult(result) {
        return this.result = result;
    }
    setMessage(message) {
        return this.message = message;
    }
}
exports.Response = Response;
//# sourceMappingURL=Response.js.map