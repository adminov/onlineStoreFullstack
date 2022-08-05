import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

//В переменнии response помещаем ответ который будет возращаться от сервера и это пост запрос, базовый урл берется из системный переменный к нему добавляем апи auth and registration те поинты указывали в сервере и тела запроса передаем емайл пароль и роль
export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth',);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};
