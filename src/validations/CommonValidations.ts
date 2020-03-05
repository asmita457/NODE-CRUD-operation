import * as Joi from "joi";
import { RouteOptionsResponseSchema } from '@hapi/hapi';

export const getAllApiQueryParams: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    "sort": Joi.string(),
    "page": Joi.number().default(0),
    "size": Joi.number().default(10),
    "search": Joi.string(),
    "filters": Joi.object()
});

export const idInParams: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    "id": Joi.string().required()
})

export const quoteCreateUpdateValidateObject: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    "quote": Joi.string().required(),
    "date": Joi.date().required(),
    "isActive": Joi.number().default(1)
})


export const quoteLikeValidationObject: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    "quoteId": Joi.number().required(),
    "userId": Joi.number().required(),
})
