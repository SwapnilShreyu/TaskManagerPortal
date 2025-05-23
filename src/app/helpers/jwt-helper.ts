
import { IUser } from "../interfaces/iuser";
/**
 * @credits for helper class goes to https://github.com/auth0/angular2-jwt
 */

export class JwtHelper {

    token:string="";
    
  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // credits for decoder goes to https://github.com/atk
  private b64decode(str: string): string {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output: string = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    for (
      // initialize result and counters
      let bc: number = 0, bs: any, buffer: any, idx: number = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  /**
   * this is used to decode our token if passed or pick it from the local storage
   * @param token
   */
 // public decodeToken(token?: string): IUser {

    // if (token == null) {
    //   token = localStorage.getItem('token');
    // }

    /**
     * if it is still null, we return null since no token yet
     */
    // if (token == null) {
    //   return null;
    // }

    // let parts = token.split('.');

    // if (parts.length !== 3) {
    //   throw new Error('JWT must have 3 parts');
    // }
//let parts = "";
   //  let decoded = this.urlBase64Decode(parts[1]);
    // if (!decoded) {
    //   throw new Error('Cannot decode the token');
    // }

//    return JSON.parse(decoded);
 // }

  public getTokenExpirationDate(token?: string): Date {
    // if (token == null) {
    //   token = localStorage.getItem('token');
    // }

    // let decoded: any;
    // decoded = this.decodeToken(token);

    // if (!decoded.hasOwnProperty('exp')) {
    //   return null;
    // }

     let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    // date.setUTCSeconds(decoded.exp);

     return date;
  }

  public isTokenExpired(token?: string, offsetSeconds?: number): boolean {
    return false;
    // if (token == null) {
    //   token = localStorage.getItem('token');
    // }

    // let date = this.getTokenExpirationDate(token);
    // offsetSeconds = offsetSeconds || 0;

    // if (date == null) {
    //   return false;
    // }

    // // Token expired?
    // return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }

  public getTokenRoles(): string {
    const token = localStorage.getItem('token');

    let decoded: any;

    // decoded = this.decodeToken(token);

    // if (!decoded.hasOwnProperty('Role')) {
    //   return null;
    // }
    return decoded.Role;

  }
}
