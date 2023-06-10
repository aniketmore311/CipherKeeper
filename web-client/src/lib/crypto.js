//@ts-check
import CryptoJS from "crypto-js";

/**
 * @param {string} password
 * @param {string} salt
 * @param {number} iterations
 * @returns
 */
export function generateKeyUsingPBKDF2(password, salt, iterations) {
  // Convert the password and salt to WordArrays
  var passwordWordArray = CryptoJS.enc.Utf8.parse(password);
  var saltWordArray = CryptoJS.enc.Utf8.parse(salt);

  // Generate the key using PBKDF2
  var key = CryptoJS.PBKDF2(passwordWordArray, saltWordArray, {
    keySize: 256 / 32, // 256 bits
    iterations: iterations,
  });

  // Convert the key to a hexadecimal string
  var keyHex = key.toString(CryptoJS.enc.Hex);

  return keyHex;
}

/**
 * @param {string} message
 * @param {string} key
 * @returns {string}
 */
export function encrypt(message, key) {
  var encrypted = CryptoJS.AES.encrypt(message, key);
  return encrypted.toString();
}

/**
 *
 * @param {string} cipherText
 * @param {string} key
 */
export function decrypt(cipherText, key) {
  var decrypted = CryptoJS.AES.decrypt(cipherText, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
