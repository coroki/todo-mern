import { Schema, model, Document } from 'mongoose';

export interface ITodoItem {
    _id?: string;
    name: string;
    date?: string;
}

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const TodoItem = model<ITodoItem & Document>('todo-item', schema);
