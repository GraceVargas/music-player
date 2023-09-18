import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = (code: string) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

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



    useEffect(() => {
        axios.post("http://localhost:3001/refresh", {refreshToken})
        .then(res => {
            console.log(res.data)
            // setAccessToken(res.data.accessToken)
            // setRefreshToken(res.data.refreshToken)
            // setExpiresIn(res.data.expiresIn)

            // window.history.pushState({}, '', '/');
        }).catch(() => {
            window.location.href = '/login';
        })

    }, [refreshToken, expiresIn])

    return accessToken
}

export { useAuth }