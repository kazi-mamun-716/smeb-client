
const useCodeValidation = (code) => {
    const secretKey = import.meta.env.VITE_API_KEY;
    const encrypt = code ^ parseInt(secretKey);
    console.log(secretKey, encrypt.toString(), code)
   console.log(String.fromCharCode(code))
   console.log(String.fromCharCode(secretKey))
   console.log(String.fromCharCode(encrypt))
}

export default useCodeValidation;