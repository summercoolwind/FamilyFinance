
const crypto = require('crypto');
class Utils{
    constructor(){
    }

    static responseClient(res:any,httpCode = 500, code = 3,message='服务端异常',data={}) {
        let responseData = {
            code,message,data
        };
        res.send(httpCode,responseData);
    }

    static MD5_SUFFIX = 'shjdskldsl;wrieowpfkdsfkjdslfkls;kf;lw;lwqkfjksldjfldsjfldsj';
    static md5 (pwd:string) {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex')
    }
}
export default Utils;
