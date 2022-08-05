import axios from "axios";

//обычный запрос не требует авторизацию
const $host = axios.create({
    // Здесь в опция можно указать урл будут отправлятся запросы
    baseURL: process.env.REACT_APP_API_URL
});

//в каждуму запросу автоматический будут поставлятся ХедерАвторейшен туда же будут добавлятся токен
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});


//Случае второго инстанса необходимо поставлят автоматический токен каждому запросу для этого есть интерсеттеры
//это просто функций который в параметре принимает config
//в сonfig добавляем headers.authorization и указываем наш токен который будем получать из локального хранилища по ключу token
//при авторизации будем добавлят в этом хранилище
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
};

//для $authHost добавляем interceptors для имеено на запроса можно добавлят для ответа но мы именно на запроса.
// И он будет отработать перед каждом запросом и поставлят token headers.authorization
$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
