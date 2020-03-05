"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.getAllApiQueryParams = Joi.object().keys({
    "sort": Joi.string(),
    "page": Joi.number().default(0),
    "size": Joi.number().default(10),
    "search": Joi.string(),
    "filters": Joi.object()
});
exports.idInParams = Joi.object().keys({
    "id": Joi.string().required()
});
exports.quoteCreateUpdateValidateObject = Joi.object().keys({
    "quote": Joi.string().required(),
    "date": Joi.date().required(),
    "isActive": Joi.number().default(1)
});
exports.quoteLikeValidationObject = Joi.object().keys({
    "quoteId": Joi.number().required(),
    "userId": Joi.number().required(),
});
//# sourceMappingURL=CommonValidations.js.map