import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer.ts';
import { setAuthTokens, clearAuthTokens } from '../../redux/slices/authSlice.ts';

const useAuth = (code: string) => {
    
    const dispatch = useDispatch();
    const { accessToken, refreshToken, expiresIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        axios.post("http://localhost:3001/login", {code})
        .then(res => {
            dispatch(setAuthTokens({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                expiresIn: res.data.expiresIn,
            }));

            window.history.pushState({}, '', '/');
        }).catch(() => {
            window.location.href = '/login';
        })
    }, [code, dispatch])


    // Si aun no hay un refreshToken, genero uno 1 minuto antes del tiempo de expiresIn

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
            const tokenInterval = setInterval(() => {
                axios.post("http://localhost:3001/refresh", {refreshToken})
                .then(res => {
                    dispatch(setAuthTokens({
                        accessToken: res.data.accessToken,
                        refreshToken,
                        expiresIn: res.data.expiresIn,
                    }));
                }).catch(() => {
                    dispatch(clearAuthTokens());
                    window.location.href = '/';
                 })
            }, (expiresIn - 60) * 1000)   
        
        
            return () => clearInterval(tokenInterval);
    }, [refreshToken, expiresIn, dispatch])

    return accessToken
}

export { useAuth }