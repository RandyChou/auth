import crypto from 'crypto';

export default {
    getMd5: function(text) {
        return crypto.createHash('md5').update(text, 'utf8').digest('hex');
    }
};