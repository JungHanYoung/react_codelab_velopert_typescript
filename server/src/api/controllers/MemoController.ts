import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

import { Request_signUp, Request_signIn } from "./interface";
import * as accountService from "../services/AccountService";
import * as memoService from "../services/MemoService";
import { Request_writeMemo, Request_Memo, Request_modifyMemo } from './interface/memo';

class AccountController {

    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public writeMemo(req: Request_writeMemo, res: Response) {

        // CHECK LOGIN STATUS
        accountService.checkLoginStatus(req, res);

        // 메모내용 유효성 검사
        memoService.checkContentsValid(req, res);

        // 메모 저장
        memoService.createNewMemo(req, res);
        
        
    }
    public getMemoList(req: Request, res: Response) {
        
        // 메모 읽기
        memoService.readMemoList(req, res);

    }
    public modifyMemo(req: Request_modifyMemo, res: Response) {

        memoService.checkMemoIdValidity(req, res);

        memoService.checkContentsValid(req, res);

        accountService.checkLoginStatus(req, res);

        memoService.checkMemoExistence(req, res);

        memoService.checkMemoWriterValid(req, res);

        memoService.modifyAndSaveMemo(req, res);

    }
    public deleteMemo(req: Request_Memo, res: Response) {

        memoService.checkMemoIdValidity(req, res);

        accountService.checkLoginStatus(req, res);

        memoService.checkMemoExistence(req, res);

        memoService.checkMemoWriterValid(req, res);

        memoService.removeMemo(req, res);
    }

    public routes() {
        this.router.post('/', this.writeMemo);
        this.router.put('/:id', this.modifyMemo);
        this.router.delete('/:id', this.deleteMemo);
        this.router.get('/', this.getMemoList);
    }
}

export default new AccountController().router;