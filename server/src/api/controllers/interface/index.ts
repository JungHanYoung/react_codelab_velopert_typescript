import { Request } from 'express';

export interface Request_signUp extends Request {
    body: {
        username: string,
        password: string
    }
}

export interface Request_signIn extends Request {
    body: {
        username: string,
        password: string
    }
}