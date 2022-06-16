import CryptoJS from "crypto-js";
 
// 定义接口类型，根据需要可自行定义，此处供参考
export interface CrypotoType {
  encryptCBC: any
  decryptCBC: any
}
 
export default class Crypoto implements CrypotoType {
  private myKey = "云中的博客"

  /** CBC加密 */
  encryptCBC(data: string | object) {
    if (typeof data === 'string'){
      return CryptoJS.AES.encrypt(data, this.myKey).toString()
    }else if (typeof data === 'object'){
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.myKey).toString()
    }else{
      return data
    }
  }

  /** CBC解密 */
  decryptCBC(data: string) {
    const bytes  = CryptoJS.AES.decrypt(data, this.myKey)
    const decString = bytes.toString(CryptoJS.enc.Utf8)
    try {
      const obj = JSON.parse(decString)
      return (typeof obj == 'object') ? obj : false
    } catch(e) {
      return decString
    }
  }
}