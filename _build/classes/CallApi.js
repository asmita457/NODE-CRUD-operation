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
const request = require("request");
class CallApi {
    constructor(method, url, data) {
        this.method = method;
        this.url = url;
        this.data = data;
        console.log("call Api constructred");
    }
    makeRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                var options = {
                    url: this.url,
                    method: this.method,
                    json: {}
                };
                if (this.method == "GET") {
                }
                else if (this.method == "POST") {
                    options.json = this.data;
                }
                else if (this.method == "PUT") {
                    options.json = this.data;
                }
                request(options, function (err, response, body) {
                    if (err) {
                        resolve(err);
                    }
                    resolve(body);
                });
            });
        });
    }
}
exports.CallApi = CallApi;
//# sourceMappingURL=CallApi.js.map