import { Request, Response } from 'express';
import { DocumentQuery } from "mongoose";
import Account from '../../models/account';

// import model interfaces
import { IAccountModel } from "../../models/account";
import { Request_signIn } from '../controllers/interface';

/**
 * 유저 네임 중복 검사
 * @param username 중복 검사 하고 싶은 유저네임
 */
export const checkUserExistance = (username: string): Promise<any> => {

    let flag_exist: any;
    
    return Account.findOne({ username });
    
}

export const createUser = (username: string, password: string): Promise<IAccountModel> => {

    let account = new Account({
        username,
        password
    });

    account.password = account.generateHash(account.password);

    // 데이터베이스에 저장
    return account.save();
}

export const checkUsernameRegex = (username: string):boolean => {

    // username 유효성 검사
    let usernameRegex = /^[a-z0-9]+$/;
    return !usernameRegex.test(username);

}

export const validateUser = (req: Request_signIn, res: Response) => {

    let { username, password } = req.body;

    Account.findOne({ username })
    .then(account => {
        if(!account) {
            return res.status(401).json({
                error: "로그인 실패",
                code: 1
            });
        }

        if(!account.validateHash(password)) {
            return res.status(401).json({
                error: "로그인 실패",
                code: 1
            });
        }

        // 세션 저장
        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        // 성공 여부 리턴
        return res.json({
            success: true
        });
    })

}

export const checkLoginStatus = (req: Request, res: Response) => {
    if(typeof req.session.loginInfo !== "undefined"){
        return res.status(403).json({
            error: "로그인 하지 않았습니다.",
            code: 1
        });
    }
}