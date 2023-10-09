import CryptoJS from 'crypto-js'

export default function encrypt (data, { key, iv }) {
  if (typeof data === 'object') {
    // 如果传入的data是json对象，先转义为json字符串
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.log('error:', error)
    }
  }
  if (!key || !iv) {
    throw new Error('parameter error')
  }
  // 统一将传入的字符串转成UTF8编码
  const dataHex = CryptoJS.enc.Utf8.parse(data) // 需要加密的数据
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse(iv) // 偏移量
  const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  })
  const encryptedVal = encrypted.toString()
  return encryptedVal //  返回加密后的值
}
