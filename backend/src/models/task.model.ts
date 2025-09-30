import { model, Schema } from "mongoose";

import { ITask } from "../interfaces/tast.interface";

const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        done: { type: Boolean, default: false },
        priority: { type: Number, required: true },
        dueDate: { type: Date },
        category: { type: String },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);
export const Task = model<ITask>("Task", taskSchema);
