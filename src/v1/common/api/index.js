import axios from 'axios';

// axios 인스턴스 base url
const instanceBaseUrl = '/api/rest/v1';

/*
    Axios 인스턴스를 생성하고
    API interceptor를 설정합니다.
*/
const instance = axios.create({
    baseURL: instanceBaseUrl,
    timeout: 3000,
    headers: {
        "Authorization": 'Bearer '
    }
});

/*
    생성한 인스턴스에 interceptor를 설정합니다.
*/
// request
instance.interceptors.request.use(
    function(config) {
        /*
            요청성공 직전 호출됩니다.
        */
        return config;
    },
    function(error) {
        /*
            요청에러 직전 호출됩니다.
        */
        return Promise.reject(error);
    }
);
// response
instance.interceptors.response.use(
    function (response) {
        /*
            http status가 200인 경우
            응답 성공 직전 호출됩니다. 
            .then() 으로 이어집니다.
        */
        return response;
    },
    function(error) {
        /*
            http status가 200이 아닌 경우
            응답 에러 직전 호출됩니다.
            .catch() 으로 이어집니다.    
        */
        return Promise.reject(error);
    }
);

/*

*/
const API_GET = (url, params) => instance.get(
    /*
        TODO[]: 
    */
);
const API_POST = (url, body) => instance.post(
    /*
        TODO[]: 
    */
);

export default {
    API_GET,
    API_POST,
}