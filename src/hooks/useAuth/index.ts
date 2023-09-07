import axios from "axios";
import { useEffect, useState } from "react";
import Global from "../../../server/Global/Global";

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post(`${Global.redirect_uri}/login`, {code})
        .then(res => {
            console.log(res.data)
        })
    }, [code])
}

export { useAuth }