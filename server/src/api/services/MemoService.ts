import { Request, Response } from 'express';
import * as mongoose from "mongoose";
import Memo from '../../models/memo';
import { Request_writeMemo, Request_Memo, Request_modifyMemo } from '../controllers/interface/memo';

export const checkContentsValid = (req: Request_writeMemo, res: Response) => {
    if(typeof req.body.contents !== 'string'){
        return res.status(400).json({
            error: "Contents가 비어있습니다",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "Contents가 비어있습니다.",
            code: 2
        });
    }
}

export const createNewMemo = (req: Request_writeMemo, res: Response) => {
    let memo = new Memo({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    memo.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
}

export const readMemoList = (req: Request, res: Response) => {
    Memo.find()
    .sort({ _id: -1 })
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
}

export const checkMemoIdValidity = (req: Request_Memo, res: Response) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            error: "유효하지 않은 ID",
            code: 1
        });
    }
}

export const checkMemoExistence = (req: Request_Memo, res: Response) => {

    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(!memo) {
            return res.status(404).json({
                error: "메모가 없습니다.",
                code: 3
            });
        }

    });
}

export const checkMemoWriterValid = (req: Request_Memo, res: Response) => {

    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "허가 실패",
                code: 4
            })
        }
    })
}

export const removeMemo = (req: Request_Memo, res: Response) => {

    Memo.findByIdAndRemove(req.params.id, err => {
        if(err) throw err;
        res.json({ success: true });
    });
}

export const modifyAndSaveMemo = (req: Request_modifyMemo, res: Response) => {

    Memo.findById(req.params.id, (err, memo) => {

        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;

        memo.save((err, memo) => {
            if(err) throw err;
            return res.json({
                success: true,
                memo
            });
        });
    });
}