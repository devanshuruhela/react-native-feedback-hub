// Convert base64 to binary data for React Native
// TS declaration only; assumes atob is available at runtime (Hermes/polyfill)
declare const atob: (data: string) => string;

export const convertToBytes = (fileData: string) =>{
    const binaryString = atob(fileData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }