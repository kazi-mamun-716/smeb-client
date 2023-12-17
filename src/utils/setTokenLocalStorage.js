export default function setTokenLocalStorage(token){
    return localStorage.setItem('authToken', token)
}