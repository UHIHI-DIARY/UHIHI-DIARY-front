import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, ErrorTextBox } from '../../components/auth';
import { AuthAPI } from '../../api/Auth';
import { isStandardEmail } from '../../lib/ErrorManager';
import { FullWindowLoading } from '../../components/common';

const PWSearch = () => {
    let emailErrorText = "";
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        (async function(){
            let email = document.getElementById("email").value;
            if(isStandardEmail(email)){
                document.getElementById("err").innerText = "";
                try{
                    setIsLoading(true);
                    await AuthAPI.postAuthTmpPassword(email);
                    alert("이메일로 임시 비밀번호를 보냈어요!");
                    navigate("/login");
                }catch(error){
                    if(error.response.status===400){
                        document.getElementById("err").innerText = "가입되지 않은 이메일입니다";
                    }
                    else{
                        document.getElementById("err").innerText = "잠시 후에 다시 시도해주세요 ㅠㅠ";
                    }
                }finally{
                    setIsLoading(false);
                }
            }
            else{
                document.getElementById("err").innerText = "이메일을 입력해주세요!";

            }
        })();
    }   
    return (
    <AuthContent>
        {isLoading && <FullWindowLoading/>}
        <AuthContent title="비밀번호 찾기">
            <InputWithLabel label="이메일" id="email" name="email" placeholder="이메일"/>
            <ErrorTextBox text={emailErrorText} display="block" id="err" />
            <AuthButton onClick={handleSubmit}>이메일 전송</AuthButton>
            <RightAlignedLink to="/login">로그인</RightAlignedLink>
        </AuthContent>
    </AuthContent>);
};



export default PWSearch;