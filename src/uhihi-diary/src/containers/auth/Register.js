

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, InputAndButton, ErrorTextBox } from '../../components/auth';
import { FullWindowLoading } from '../../components/common';
import { isNoneErrorCharInPassword, isStandardEmail, isStandardNickname, isStandardPassword } from '../../lib/ErrorManager';
import { AuthAPI } from '../../api/Auth';
import { setAuthorizationToken } from '../../lib';

function Register() {
    const navigate = useNavigate();
    let checkcode = "";
    let nickname = "";
    let password = "";
    let checkPassword = "";
    const [email, setEmail] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [nicknameErrorText, setNicknameErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("비밀번호에는 8~20자로 이뤄지고, 알파벳과 숫자가 꼭 들어가야해요!");
    const [passwordCheckErrorText, setPasswordCheckErrorText] = useState("");
    const [checkStatus, setCheckStatus] = useState(0);
    const [emailButtonText, setEmailButtonText] = useState("인증 요청");
    const [waitSendEmail, setWaitSendEmail] = useState(false);
    const [waitCertifyEmail, setWaitCertifyEmail] = useState(false);
    const [waitRegister, setWaitRegister] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    // 인증메일 요청 버튼 클릭
    const emailSendingRequest = (event) => {
        if(isStandardEmail(email) && email.length>0 && !waitSendEmail){
            event.preventDefault();
            if(checkStatus !== 2){
                handlePostEmailcode(email);
            }
        }
        else{
            setEmailErrorText("이메일을 적어주세요!");
        }
    }

    // 번호 인증 요청 버튼 클릭
    const emailCheckingRequest = (event) => {
        checkcode = document.getElementById("check-email").value;
        if(checkStatus === 1 && checkcode.length === 6){
            event.preventDefault();
            handlePostEmailcheck(email,checkcode);
        }
        else{
            setEmailErrorText("6자리의 인증코드를 입력해주세요!");
        }
    }

    // 회원가입 버튼 클릭
    const handleSubmit = (event) => {
        nickname = document.getElementById("username").value;
        password = document.getElementById("password").value;
        checkPassword = document.getElementById("passwordConfirm").value;
        if(isStandardEmail(email) && isStandardNickname(nickname) && isStandardPassword(password) && password === checkPassword &&
            email!=="" && nickname !== "" && password !== "" && checkPassword!=="" && checkStatus === 2){
            event.preventDefault();
            handlePostRegister(email,password,nickname,checkcode);
        }
        else{
            if(email==="" || !isStandardEmail(email)) setEmailErrorText("이메일을 적어주세요!");
            else setEmailErrorText("");

            if(nickname==="" || !isStandardNickname(nickname)) setNicknameErrorText("닉네임은 2~8자의 영어, 한국어, 숫자로 이뤄져요!");
            else setNicknameErrorText("");

            if(!isNoneErrorCharInPassword(password)) setPasswordErrorText("들어갈 수 없는 문자가 있어요!");
            else if(password==="" || !isStandardPassword(password)) setPasswordErrorText("비밀번호에는 8~20자로 이뤄지고, 알파벳과 숫자가 꼭 들어가야해요!");
            else setPasswordErrorText("");

            if(password!==checkPassword) setPasswordCheckErrorText("비밀번호와 일치시켜주세요!");
            else setPasswordCheckErrorText("");
        }
    }

    const handlePostEmailcode = (email) => {
        (async function(){
            try{
                setWaitSendEmail(true);
                await AuthAPI.postAuthEmailcode(email);
                setEmailButtonText("인증 재요청");
                setCheckStatus(1);
            }catch(err){
                if('response' in err && err.response.status === 400){
                    setEmailErrorText("이메일이 중복됐어요!");
                }
                else{
                    setEmailErrorText("잠시 후에 다시 시도해주세요 ㅠㅠ");
                }
            }finally{
                setWaitSendEmail(false);
            }
        })();
    }

    const handlePostEmailcheck = (email, code) => {
        (async function(){
            try{
                setWaitCertifyEmail(true);
                let data = await AuthAPI.postAuthEmailcheck(email, code);
                setEmailErrorText("");
                setEmailButtonText("인증 완료");
                setCheckStatus(2);
            } catch(err){
                if('response' in err && err.response.status === 400){
                    setEmailErrorText("코드가 틀렸어요!");
                }
                else{
                    setEmailErrorText("잠시 후에 다시 시도해주세요 ㅠㅠ");
                }
            }finally{
                setWaitCertifyEmail(false);
            }
        })();
    }

    const handlePostRegister = (email, password, nickname, checkcode) => {
        (async function(){
            try{
                setWaitRegister(true);
                let res = await AuthAPI.postAuthRegister(email, password, nickname, checkcode);
                alert(`환영합니다 ${nickname}님!!`);
                const token = res.data.token;
                localStorage.setItem("uhihiToken",token);
                setAuthorizationToken(token);
                navigate("/"); 
            }catch(err){
                if('response' in err && err.response.status === 400){
                    if(err.response.statusText === "EMAIL_ERROR"){
                        alert("이메일 인증이 만료됐어요! 다시 해주세요...");
                        setEmailButtonText("인증 요청");
                        setCheckStatus(0);
                    }
                    if(err.response.statusText === "PASSWORD_ERROR"){
                        alert("비밀번호를 확인해주세요!");
                    }
                    if(err.response.statusText === "NICKNAME_ERROR"){
                        alert("닉네임을 확인해주세요!");
                    }
                }
                else{
                    alert("잠시 후에 다시 시도해주세요 ㅠㅠ");
                }
            }finally{
                setWaitRegister(false);
            }
        })();
    }

    return (
        <AuthContent title="회원가입">
            {(waitSendEmail || waitCertifyEmail || waitRegister) && <FullWindowLoading/>}
            {checkStatus !== 0 ?
            // 인증 요청 이후에는 이메일 수정 금지
            <InputAndButton label="이메일" inputText={emailButtonText} onClick={emailSendingRequest} name="email" placeholder="이메일" value={email} readonly/>
            :
            <InputAndButton label="이메일" inputText={emailButtonText} onClick={emailSendingRequest} name="email" placeholder="이메일" onChange={handleEmailChange}/>
            }
            {checkStatus === 1 && 
            // 인증 요청중일 때만 나타나는 블럭
            <InputAndButton label="이메일 인증" inputText="인증하기" onClick={emailCheckingRequest} id="check-email" name="check-email" placeholder="인증 코드"/>
            }
            <ErrorTextBox text={emailErrorText} display={emailErrorText==="" ? "none" : "block"}/>
            <InputWithLabel label="닉네임" id="username" name="username" placeholder="닉네임"/>
            <ErrorTextBox text={nicknameErrorText} display={nicknameErrorText==="" ? "none" : "block"}/>
            <InputWithLabel label="비밀번호" id="password" name="password" placeholder="비밀번호" type="password"/>
            <ErrorTextBox text={passwordErrorText} display={passwordErrorText==="" ? "none" : "block"}/>
            <InputWithLabel label="비밀번호 확인" id="passwordConfirm" name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
            <ErrorTextBox text={passwordCheckErrorText} display={passwordCheckErrorText==="" ? "none" : "block"}/>
            <AuthButton onClick={handleSubmit}>회원가입</AuthButton>
            <RightAlignedLink to="/login">로그인</RightAlignedLink>
        </AuthContent>
    );
}

export default Register;