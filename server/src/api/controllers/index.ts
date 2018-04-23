import * as express from 'express';
import accountController from './AccountController';
import memoController from './MemoController';

class apiController {
    
    public router: express.Router;

    constructor(){
        this.router = express.Router();
        this.routes();
    }

    routes(){
        this.router.use('/account', accountController);
        this.router.use('/memo', memoController);
    }
}

export default new apiController().router;