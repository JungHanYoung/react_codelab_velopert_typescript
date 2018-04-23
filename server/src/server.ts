import * as express from 'express';
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import * as path from 'path';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as session from 'express-session';

// import Router
import apiController from './api/controllers';

class Server {

    public app: express.Application;

    constructor() {

        this.app = express();
        this.config();
        this.routes();
        this.app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
        this.app.use(function(err: any, req, res, next) {
            console.error(err.stack);
            res.status(err.status || 500)
            .send('Something broke!')
        });

    }

    public config(): void {

        const db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => console.log('Connected to MongoDB Server'));

        mongoose.connect('mongodb://jhy:7685@ds249839.mlab.com:49839/memopad_typescript');

        this.app.use(session({
            secret: 'CodeLab_Typescript',
            resave: false,
            saveUninitialized: true
        }))
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, './../public')));
        

    }

    public routes(): void {

        this.app.use('/api', apiController);

        this.app.get('/hello', (req, res) => {
            return res.send('Hello Typescript CodeLab');
        });
    }
    
}

export default new Server().app;