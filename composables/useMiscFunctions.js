
export function useMiscFunctions() {

    function stripPhone(phone) {
        phone = phone.replace(/\D/g,'');
        return phone;
    }

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    
    function isInList(str, list) {
        return list.includes(str);
      }

    function roundTo(value, decimals) {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    }

    async function encryptData(data, key) {
        const iv = window.crypto.getRandomValues(new Uint8Array(12))
        const encodedData = new TextEncoder().encode(data);
        const encryptedData = await crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv // Initialization vector
          },
          key,
          encodedData
        );

        let base64Data= arrayBufferToBase64(encryptedData);
        let base64Iv = arrayBufferToBase64(iv);

        return {data: base64Data, iv: base64Iv} ;
      }

    async function decryptData(encryptedData, key, iv) {

        let bufferArrayData = base64ToArrayBuffer(encryptedData);
        let bufferArrayIv = base64ToArrayBuffer(iv);
        const decryptedData = await crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: bufferArrayIv // Initialization vector used during encryption
          },
          key,
          bufferArrayData
        );
        return new TextDecoder().decode(decryptedData);
      }

    async function generateKey() {
        const key = await crypto.subtle.generateKey(
            {
            name: "AES-GCM",
            length: 256
            },
            true, // Extractable
            ["encrypt", "decrypt"]
        );
        return key;
    }

    async function importKey(jwk) {
        const key = await crypto.subtle.importKey(
          'jwk',
          JSON.parse(jwk),
          {
            name: 'AES-GCM',
            length: 256
          },
          true,
          ['encrypt', 'decrypt']
        );
        return key;
      }

      async function exportKey(key) {
        const exportedKey = await crypto.subtle.exportKey('jwk', key);
        return JSON.stringify(exportedKey);
      }


      function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      
      function base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
      }
      
      function validateStreetNumberAndName(address) {
        const streetPattern = /^\d+\s+[a-zA-Z0-9\s]+$/;
        return streetPattern.test(address);
      }

      function getDateTimeString() {
        const now = new Date();

        const YYYY = now.getFullYear();
        const MM = String(now.getMonth() + 1).padStart(2, '0');     // month
        const DD = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');       // minutes
        const SS = String(now.getSeconds()).padStart(2, '0');

        return `${YYYY}${MM}${DD}${mm}${SS}`;
      }


    return {
        stripPhone,
        validateEmail,
        isInList,
        roundTo,
        encryptData,
        decryptData,
        generateKey,
        exportKey,
        importKey,
        validateStreetNumberAndName,
        getDateTimeString
    }


}