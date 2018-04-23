import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

import { Request_signUp, Request_signIn } from "./interface";
import { checkUserExistance, createUser, checkUsernameRegex, validateUser } from "../services/AccountService";

class AccountController {

    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    /**
     * Account SignUp: POST /api/account/signup
     * BODY : { "username", "password" }
     * ERROR CODES:
     *   1: 잘못된 username
     *   2: 잘못된 password
     *   3: 이미 존재하는 username
     * @param req 
     * @param res 
     */
    public signUp(req: Request_signUp, res: Response) {
        let { username, password } = req.body;

        if(checkUsernameRegex(username)){
            return res.status(400).json({
                error: "잘못된 유저네임",
                code: 1
            })
        }

        // password 길이 체크
        if(password.length < 4 || typeof password !== "string") {
            return res.status(400).json({
                error: "잘못된 패스워드",
                code: 2
            });
        }

        // username 존재 유무 확인
        checkUserExistance(username)
        .then(account => {
            if(account){
                return res.status(409).json({
                    error: "중복된 유저네임",
                    code: 3
                });
            }
        })
        .catch(err => {
            throw err;
        });

        // 유저 생성
        createUser(username, password)
        .then(() => res.json({ success: true }))
        .catch(err => {
            throw err;
        })

    }

    public signIn(req: Request_signIn, res: Response) {

        let { username, password } = req.body;

        if(typeof password !== "string") {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        validateUser(req, res);
    }

    public getInfo(req: Request, res: Response) {

        if(typeof req.session.loginInfo === "undefined") {
            return res.status(401).json({
                error: 1
            });
        } else {
            res.json({ info: req.session.loginInfo });
        }

    }

    public logout(req: Request, res: Response) {
        req.session.destroy(err => { if(err) throw err; });
        return res.json({ success: true });
    }

    public routes(): void {

        this.router.post('/signup', this.signUp);
        this.router.post('/signin', this.signIn);
        this.router.get('/getinfo', this.getInfo);
        this.router.post('/logout', this.logout);

    }
}

export default new AccountController().router;