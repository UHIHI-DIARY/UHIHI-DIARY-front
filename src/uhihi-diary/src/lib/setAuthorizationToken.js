import axios from 'axios';

export default function setAuthorizationToken() {
    try{
        const token = localStorage.getItem('uhihiToken');
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }else{
            delete axios.defaults.headers.common['Authorization'];
        }
    }
    catch(err){
        console.log(err);
    }
    
}