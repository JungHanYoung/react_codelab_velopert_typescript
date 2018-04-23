import { Schema, model, Document } from "mongoose";

interface IMemo {
    writer: string;
    contents: string;
    starred: [string];
    date: {
        created: Date;
        edited: Date;
    };
    is_edited: boolean
}

export interface IMemoModel extends IMemo, Document {

}

const Memo = new Schema({
    writer: String,
    contents: String,
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }
});

export default model<IMemoModel>('memo', Memo);