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
class DataPreparation {
    static convertObjectsToStringsInPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let keys = Object.keys(payload);
                for (let i = 0; i < keys.length; i++) {
                    if (typeof (payload[keys[i]]) == 'object') {
                        payload[keys[i]] = JSON.stringify(payload[keys[i]]);
                    }
                }
                return payload;
            }
            catch (err) {
                return {};
            }
        });
    }
    static toProperCase(str) {
        return __awaiter(this, void 0, void 0, function* () {
            str = str.trim();
            return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        });
    }
    static removeDuplicates(array) {
        return __awaiter(this, void 0, void 0, function* () {
            return [...new Set([...array])];
        });
    }
    ;
}
exports.DataPreparation = DataPreparation;
//# sourceMappingURL=DataPreparation.js.map