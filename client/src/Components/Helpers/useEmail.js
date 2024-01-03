
const useEmail = () =>{
    const email = localStorage.getItem('email');
    let transformedEmail = '';
    if(email) {
        email.split('').forEach((c) => {
            if(c!=='@' && c!=='.' && c!==' ') transformedEmail +=(c)
        })
    }
    return transformedEmail;
}
export default useEmail;