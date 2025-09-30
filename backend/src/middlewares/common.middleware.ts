import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`${key}: ${id} invalid Id`, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }
    public query(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const queryCopy = { ...req.query };

                Object.keys(queryCopy).forEach((key) => {
                    const val = queryCopy[key];
                    if (Array.isArray(val)) {
                        queryCopy[key] = val[0];
                    }
                });

                const validatedQuery = await validator.validateAsync(queryCopy);

                Object.assign(req.query, validatedQuery);

                next();
            } catch (e: any) {
                const message =
                    e?.details?.[0]?.message || e.message || "Validation error";
                next(new ApiError(message, 400));
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
