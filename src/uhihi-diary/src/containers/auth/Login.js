/* eslint-disable */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, ErrorTextBox } from 'components/auth';
import { RowCollocateRight } from 'components/common';
import { setAuthorizationToken } from 'lib';
import { AuthAPI } from 'api/Auth';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        try {
            let data = await AuthAPI.postAuthLogin(email, password);
            let token = data["token"];
            let refreshToken = data["refreshToken"];
            await localStorage.setItem("uhihiToken", token);
            await setAuthorizationToken();
            navigate("/");
            location.reload();
        } catch (error) {
            console.log(error);
            if('response' in error && error.response.status===400){
                setEmailErrorText("이메일 또는 비밀번호가 틀렸습니다");
            }
            else{
                setEmailErrorText("잠시 후에 다시 시도해주세요 ㅠㅠ");
            }
        }
    };

    return (
        <AuthContent title="로그인">
            <InputWithLabel label="이메일" name="email" placeholder="이메일" onChange={handleEmailChange}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handlePasswordChange}/>
            <ErrorTextBox text={emailErrorText} display={emailErrorText==="" ? "none" : "block"}/>
            <AuthButton onClick={handleSubmit}>로그인</AuthButton>
            <RowCollocateRight>
                <RightAlignedLink to="/register">회원가입</RightAlignedLink>
                <RightAlignedLink to="/password-search">비밀번호 찾기</RightAlignedLink>
            </RowCollocateRight>
        </AuthContent>
    );
}

export default Login;