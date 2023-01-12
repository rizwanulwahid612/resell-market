import { useEffect, useState } from "react";

const TokenHook = email => {
                        
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {        
            fetch(`https://resell-server-rizwanulwahid612.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('token', data.accessToken);
                        setToken(data.accessToken);
                    }
                })
        }
    }, [email])
    return [token];
}
export default TokenHook;