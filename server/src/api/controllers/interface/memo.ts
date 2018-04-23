import { Request } from "express";

export interface Request_writeMemo extends Request {
    body: {
        contents: string;
    }
};

export interface Request_Memo extends Request {
    params: {
        id: string;
    }
};

export interface Request_modifyMemo extends Request_Memo {
    body: {
        contents: string;
    }
}