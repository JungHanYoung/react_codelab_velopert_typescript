import { Schema, model, Document, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

interface IAccount {
    username: string,
    password: string,
    created: Date
}

export interface IAccountModel extends IAccount, Document{
    generateHash(password:string): string;
    validateHash(password:string): boolean; 
}

// Definition Schema
let Account: Schema = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
});

// generates hash
Account.methods.generateHash = function(password:string): string {
    return bcrypt.hashSync(password, 8);
}

// compares the password
Account.methods.validateHash = function(password:string): boolean {
    return bcrypt.compareSync(password, this.password);
} 

export default model<IAccountModel>('account', Account);