import React from 'react';

import Auth from 'pages/Login';

const Home = () => {
    if(localStorage.getItem("uhihiToken")!=null){
        return(
            <div>
                Home
            </div>
        );
    }
    else{
        // 로그인이 안돼있을 때
        return Auth();
    }
}

export default Home
