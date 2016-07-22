import tip from '../config/tip';

export default function returnObject(ctx, result) {
    if (result.code == 200) {
        ctx.body = {
            status: result.code,
            errMsg: "",
            info: result.info
        };
    } else {
        ctx.body = {
            status: result.code,
            errMsg: result.err && result.err.message,
            info: null
        };
    }
}