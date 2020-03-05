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
const StatusCodes_1 = require("./StatusCodes");
const Response_1 = require("./Response");
class ShellCommand {
    static executeCommand(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            const exec = require('child_process').exec;
            return new Promise((resolve, reject) => {
                exec(cmd, (error, stdout, stderr) => {
                    let response;
                    if (error) {
                        response = new Response_1.Response(false, StatusCodes_1.StatusCodes.BAD_REQUEST, error, {});
                    }
                    if (stdout) {
                        response = new Response_1.Response(true, StatusCodes_1.StatusCodes.OK, stdout, {});
                    }
                    else {
                        response = new Response_1.Response(false, StatusCodes_1.StatusCodes.BAD_REQUEST, stderr, {});
                    }
                    resolve(response);
                });
            });
        });
    }
}
exports.ShellCommand = ShellCommand;
//# sourceMappingURL=ShellCommand.js.map