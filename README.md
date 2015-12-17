# 使用 Crypto 加解密

### node.js

1. 加掛 crypto

```
var crypto = require('crypto');
```

2. 加密

```
var alg = 'des-ede3',	//加密方式 3des-ecb
    key = new Buffer('0123456789abcd0123456789'),
    iv = new Buffer(0);
//key密钥和iv向量必须是'binary'2进制格式的字符串或buffers.

var cipher = crypto.createCipheriv(alg, key, iv);
cipher.setAutoPadding(true);


//output_encoding输出编码指定了加密数据的输出格式，可以是'binary', 'base64' 或者'hex'，如果没有提供这个参数，buffer将会返回。
var ciph = cipher.update(plaintext, 'utf8', 'base64');
ciph += cipher.final('base64');
console.log(alg, "encrypt: "+ciph);
```

3. 解密

```
// decrypt
var decipher = crypto.createDecipheriv(alg, key, iv);
cipher.setAutoPadding(autoPad)
var txt = decipher.update(ciph, 'base64', 'utf8');
txt += decipher.final('utf8');
console.log(alg, "decrypt: "+txt);
```

### 參考文案
參考文案 http://nodeapi.ucdok.com/api/crypto.html

編碼方式
http://stackoverflow.com/questions/14168703/crypto-algorithm-list

線上測試工具 http://tool.chacuo.net/crypt3des

### 備註

目前專案使用標準，暫定為 3des-ecb

另須注意輸入輸出編碼格式

使用線上測試工具

>加密解密工具 > 3DES加密解密

>3DES加密模式 > ECB

>填充方式 > pkcs5padding

>选择字符集 > utf-8

>輸出編碼為 base64
