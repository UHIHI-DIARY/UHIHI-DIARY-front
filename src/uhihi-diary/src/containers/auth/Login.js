import React, { useEffect, useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/auth';
import axios from 'axios';
import setAuthorizationToken from '../../lib'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true);
    };

    const tryLogin = async()=>{
        try{
            axios.post("http://132.226.237.23:8080",{email:email, password:password}).then((res)=>{
                const token = res.data.token;
                localStorage.setItem("uhihiToken",token);
                setAuthorizationToken(token);
            });
        } catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        (async function(){
            if(isLoading){
                if(!emailErrorText){
                    await new Promise(tryLogin);
                }
                setIsLoading(false);
            }
        })();
    }, [isLoading]);



    return (
        <AuthContent title="로그인">
            
            <InputWithLabel label="이메일" name="email" placeholder="이메일" onChange={handleEmailChange}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handlePasswordChange}/>
            <AuthButton onClick={handleSubmit}>로그인</AuthButton>
            <RightAlignedLink to="/register">회원가입</RightAlignedLink>
            
        </AuthContent>
    );
}

export default Login;