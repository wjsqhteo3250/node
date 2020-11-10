// const sha256 = require('sha256');

// const enc = (pwd, salt) =>{
//     return sha256(pwd + salt);
// }
const crypto = require('crypto');
crypto.DEFAULT_ENCODING = 'hex';
var pbkdf2 = require('pbkdf2')

crypto.pbkdf2('1111', 'salt', 10000, 32, 'sha512', function(err, derivedKey){
    console.log(derivedKey)
})
