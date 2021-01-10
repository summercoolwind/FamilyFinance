declare namespace Express {
    interface Request {
        session: object
    }
    interface CustomRequest extends Request{
        session:{
            userInfo:object
        }
    }
}

export = Express;