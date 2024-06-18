import axios from 'axios';

export default axios.create({
    baseURL:'https://a599-129-174-182-102.ngrok-free.app',
    headers:{"ngrok-skip-browser-warning":"true"}
})
