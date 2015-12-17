//參考文案 http://nodeapi.ucdok.com/api/crypto.html
//http://stackoverflow.com/questions/14168703/crypto-algorithm-list
//線上測試工具 http://tool.chacuo.net/crypt3des

var assert = require('assert');
var crypto = require('crypto');

function test_des(param) {
	var key = new Buffer(param.key);
	var iv = new Buffer(param.iv ? param.iv : 0)
	var plaintext = param.plaintext
	var alg = param.alg
	var autoPad = param.autoPad

	//encrypt
    //algorithm算法和createCipher() 方法的参数相同. key密钥是一个被算法使用的原始密钥，iv是一个初始化向量。
    //key密钥和iv向量必须是'binary'2进制格式的字符串或buffers.
	var cipher = crypto.createCipheriv(alg, key, iv);
	cipher.setAutoPadding(autoPad)	//default true
    //参数 output_encoding输出编码指定了加密数据的输出格式，可以是'binary', 'base64' 或者'hex'，如果没有提供这个参数，buffer将会返回。
	var ciph = cipher.update(plaintext, 'utf8', 'base64');
    //返回剩余的加密内容，output_encoding为'binary', 'base64' 或 'hex'中的任意一个。 如果没有提供编码格式，则返回一个buffer对象。
    //调用final()函数后cipher 对象不能被使用。
	ciph += cipher.final('base64');
	console.log(alg, "encrypt: "+ciph)

	// decrypt
	var decipher = crypto.createDecipheriv(alg, key, iv);
	cipher.setAutoPadding(autoPad)
	var txt = decipher.update(ciph, 'base64', 'utf8');
	txt += decipher.final('utf8');
    console.log(alg, "decrypt: "+txt)
}

test_des({
	alg: 'des-ecb',
	autoPad: true,
	key: '01234567',
	plaintext: '1234567812345678',
	iv: null
})

test_des({
	alg: 'des-cbc',
	autoPad: true,
	key: '01234567',
	plaintext: '1234567812345678',
	iv: '12345678'
})

test_des({
	alg: 'des-ede3',	//3des-ecb
	autoPad: true,
	key: '0123456789abcd0123456789',
	plaintext: '中文測試',
	iv: null
})

test_des({
	alg: 'des-ede3-cbc',	//3des-cbc
	autoPad: true,
	key: '0123456789abcd0123456789',
	plaintext: '1234567812345678',
	iv: '12345678'
})
