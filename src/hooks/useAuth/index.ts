import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = (code: string) => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>();
    const [expiresIn, setExpiresIn] = useState<number>();

    useEffect(() => {
        axios.post("http://localhost:3001/login", {code})
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)

            window.history.pushState({}, '', '/');
        }).catch(() => {
            window.location.href = '/login';
        })
    }, [code])


    // Si aun no hay un refreshToken, genero uno 1 minuto antes del tiempo de expiresIn

    useEffect(() => {
        if (!refreshToken || !expiresIn) return 
            const tokenInterval = setInterval(() => {
                axios.post("http://localhost:3001/refresh", {refreshToken})
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                }).catch(() => {
                    window.location.href = '/';
                 })
            }, (expiresIn - 60) * 1000)   
        
        
            return () => clearInterval(tokenInterval);
    }, [refreshToken, expiresIn])

    return accessToken
}

export { useAuth }