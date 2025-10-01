import Joi from "joi";

import { SortEnum } from "../enums/sort.enum";
import { TaskStatusEnum } from "../enums/task-status.enum";

export class TaskValidator {
    private static datePattern =
        /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$|^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

    public static createTask = Joi.object({
        title: Joi.string().required().trim().min(2).max(100).messages({
            "string.empty": "Task title cannot be empty",
            "string.min":
                "Task title must contain at least {#limit} characters",
            "string.max": "Task title cannot exceed {#limit} characters",
            "any.required": "Task title is required",
        }),
        priority: Joi.number().required().min(1).max(10).messages({
            "number.base": "Priority must be a number",
            "number.min": "Priority cannot be less than {#limit}",
            "number.max": "Priority cannot exceed {#limit}",
            "any.required": "Priority is required",
        }),
        description: Joi.string().optional().allow("").max(500).messages({
            "string.max": "Description cannot exceed {#limit} characters",
        }),
        dueDate: Joi.string()
            .optional()
            .allow("")
            .pattern(TaskValidator.datePattern)
            .messages({
                "string.pattern.base":
                    "Date must be in DD.MM.YYYY HH:mm or ISO format",
            }),
        category: Joi.string().optional().allow("").max(50).messages({
            "string.max": "Category cannot exceed {#limit} characters",
        }),
    });

    public static updateTask = Joi.object({
        title: Joi.string().optional().trim().min(2).max(100).messages({
            "string.min":
                "Task title must contain at least {#limit} characters",
            "string.max": "Task title cannot exceed {#limit} characters",
        }),
        priority: Joi.number().optional().min(1).max(5).messages({
            "number.base": "Priority must be a number",
            "number.min": "Priority cannot be less than {#limit}",
            "number.max": "Priority cannot exceed {#limit}",
        }),
        done: Joi.boolean().optional(),
        description: Joi.string().optional().allow("").max(500).messages({
            "string.max": "Description cannot exceed {#limit} characters",
        }),
        dueDate: Joi.string()
            .optional()
            .allow("")
            .pattern(TaskValidator.datePattern)
            .messages({
                "string.pattern.base":
                    "Date must be in DD.MM.YYYY HH:mm or ISO format",
            }),
        category: Joi.string().optional().allow("").max(50).messages({
            "string.max": "Category cannot exceed {#limit} characters",
        }),
    });

    public static queryTasks = Joi.object({
        page: Joi.number().min(1).messages({
            "number.base": "Page must be a number",
            "number.min": "Page cannot be less than {#limit}",
        }),
        pageSize: Joi.number().min(1).max(50).messages({
            "number.base": "Page size must be a number",
            "number.min": "Page size cannot be less than {#limit}",
            "number.max": "Page size cannot exceed {#limit}",
        }),
        sort: Joi.string()
            .valid(SortEnum.ASC, SortEnum.DESC)
            .default(SortEnum.ASC),
        search: Joi.string().allow("").max(100).messages({
            "string.max": "Search query cannot exceed {#limit} characters",
        }),
        status: Joi.string()
            .valid(
                TaskStatusEnum.ALL,
                TaskStatusEnum.DONE,
                TaskStatusEnum.UNDONE,
            )
            .default(TaskStatusEnum.ALL),
    });
}
