import {Request} from 'express';

interface CustomRequest extends Request{
    session:{
        userInfo:object
    }
}

export default CustomRequest;