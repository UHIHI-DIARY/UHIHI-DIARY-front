/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, InputAndButton, ErrorTextBox } from '../../components/auth';
import axios from 'axios';

function Register() {

    const [email, setEmail] = useState("");
    const [checkcode, setCheckcode] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [nicknameErrorText, setNicknameErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [passwordCheckErrorText, setPasswordCheckErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [emailButtonText, setEmailButtonText] = useState("인증 요청");
    const [alreadyEmailCheck, setAlreadyEmailCheck] = useState(false);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // 이메일 규격이 맞는지 확인
        if(!(/^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i.test(event.target.value))){
            setEmailErrorText("이메일을 적어주세요!");
        }
        else{
            setEmailErrorText("");
        }
      };

      const handleCheckcodeChange = (event) => {
        setCheckcode(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        // 비밀번호 규격 맞는지 확인
        let pw = event.target.value;
        if(!(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}$/.test(pw))){
            setPasswordErrorText("비밀번호에는 8~20자로 이뤄지고, 알파벳과 숫자가 꼭 들어가야해요!");
        }
        else if(pw.match(/[^0-9a-zA-Z`~!@#$%^&*()-=_+]/)){
            setPasswordErrorText("들어갈 수 없는 문자가 있어요 ㅠㅠ");
        }
        else{
            setPasswordErrorText("");
        }

        // 비밀번호와 비밀번호 확인이 같은지 확인
        if(checkPassword!=="" && checkPassword!==event.target.value){
            setPasswordCheckErrorText("앞서 적은 비밀번호랑 같게 해주세요!");
        }
        else{
            setPasswordCheckErrorText("");
        }
    };

    const handleCheckPasswordChange = (event) => {
        setCheckPassword(event.target.value);

        // 비밀번호와 비밀번호 확인이 같은지 확인
        if(event.target.value!=="" && event.target.value!==password){
            setPasswordCheckErrorText("앞서 적은 비밀번호랑 같게 해주세요!");
        }
        else{
            setPasswordCheckErrorText("");
        }
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
        if(!(/^[a-zA-Z가-힇0-9]{2,8}$/.test(event.target.value))){
            setNicknameErrorText("닉네임은 2~8자의 영어, 한국어, 숫자로 이뤄져요!");
        }
        else{
            setNicknameErrorText("");
        }
    };

    // 인증메일 요청 버튼 클릭
    const emailSendingRequest = (event) => {
        if(emailErrorText === "" && email.length>0){
            if(!alreadyEmailCheck && !isSending){
                event.preventDefault();
                setIsSending(true);
            }
            else if(!alreadyEmailCheck){
                event.preventDefault();
                setIsSending(false);
                setIsSending(true);
            }
        }
    }

    // 번호 인증 요청 버튼 클릭
    const emailCheckingRequest = (event) => {
        if(isSending && !alreadyEmailCheck){
            event.preventDefault();
            setIsChecking(true);
        }
    }

    // 회원가입 버튼 클릭
    const handleSubmit = (event) => {
        if(emailErrorText==="" && nicknameErrorText==="" && passwordErrorText==="" && passwordCheckErrorText==="" &&
            email!=="" && nickname !== "" && password !== "" && checkPassword!==""){
            event.preventDefault();
            setIsLoading(true);
        }
        else{
            if(email==="") setEmailErrorText("이메일을 적어주세요!");
            if(nickname==="") setNicknameErrorText("닉네임은 2~8자의 영어, 한국어, 숫자로 이뤄져요!");
            if(password==="") setPasswordErrorText("비밀번호에는 8~20자로 이뤄지고, 알파벳과 숫자가 꼭 들어가야해요!");
        }
    }

    // 인증 이메일 송신 요청 (emailSandingRequest 에서 접근)
    useEffect(()=>{
        if(isSending){
            // 서버에 이메일 송신 요청 보내기
            axios.get("/auth/email-code").then((res)=>{
                setEmailButtonText("인증 재요청");
            }).catch((error)=>{
                setIsSending(false);
                if(error.status === 400 && error.statusText === "EMAIL_REPEAT"){
                    setEmailErrorText("이메일이 중복됐어요!");
                }
                else{
                    setEmailErrorText("잠시 후에 다시 시도해주세요 ㅠㅠ");
                }
            });
        }
    }, [isSending]);

    // 이메일 확인코드 체크 요청 (emailCheckingReqeust에서 접근)
    useEffect(()=>{
        if(isChecking){
            // 이메일 확인코드 알맞은지 서버에 확인 요청
            axios.post("/auth/email-check",{email:email, code:checkcode}).then((res)=>{
                setIsSending(false);
                setEmailButtonText("인증 완료");
                setAlreadyEmailCheck(true);
            }).catch((error)=>{
                if(error.status === 400 && error.statusText === "CODE_ERROR"){
                    setEmailErrorText("코드가 틀렸어요!");
                }
                else{
                    setEmailErrorText("잠시 후에 다시 시도해주세요 ㅠㅠ");
                }
            });
        }
    }, [isChecking]);

    // 회원가입 요청 (handleSubmit에서 접근)
    useEffect(()=>{
        (async function(){
            if(isLoading){
                axios.post("/auth/register",{email:email, password:password, nickname:nickname, code:checkcode}).then((res)=>{
                    alert(`환영합니다 ${nickname}님!!`);

                }).catch((error)=>{
                    if(error.status === 400){
                        if(error.statusText === "EMAIL_ERROR"){
                            alert("이메일 인증이 만료됐어요! 다시 해주세요...");
                            setEmailButtonText("인증 요청");
                            setIsSending(false);
                            setAlreadyEmailCheck(false);
                            setIsChecking(false);
                        }
                        if(error.statusText === "PASSWORD_ERROR"){
                            alert("비밀번호를 확인해주세요!");
                        }
                        if(error.statusText === "NICKNAME_ERROR"){
                            alert("닉네임을 확인해주세요!");
                        }
                    }
                    else{
                        alert("잠시 후에 다시 시도해주세요 ㅠㅠ");
                    }
                });
                setIsLoading(false);
            }
        })();
    }, [isLoading]);

    return (
        <AuthContent title="회원가입">
            {isSending || alreadyEmailCheck?
            // 인증 요청 이후에는 이메일 수정 금지
            <InputAndButton label="이메일" inputText={emailButtonText} onClick={emailSendingRequest} name="email" placeholder="이메일" value={email} readonly/>
            :
            <InputAndButton label="이메일" inputText={emailButtonText} onClick={emailSendingRequest} name="email" placeholder="이메일" onChange={handleEmailChange}/>
            }
            {isSending && 
            // 인증 요청중일 때만 나타나는 블럭
            <InputAndButton label="이메일 인증" inputText="인증하기" onClick={emailCheckingRequest} name="check-email" placeholder="인증 코드" onChange={handleCheckcodeChange}/>
            }
            <ErrorTextBox text={emailErrorText} display={emailErrorText==="" ? "none" : "block"}/>
            <InputWithLabel label="닉네임" name="username" placeholder="닉네임" onChange={handleNicknameChange}/>
            <ErrorTextBox text={nicknameErrorText} display={nicknameErrorText==="" ? "none" : "block"}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handlePasswordChange}/>
            <ErrorTextBox text={passwordErrorText} display={passwordErrorText==="" ? "none" : "block"}/>
            <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={handleCheckPasswordChange}/>
            <ErrorTextBox text={passwordCheckErrorText} display={passwordCheckErrorText==="" ? "none" : "block"}/>
            <AuthButton onClick={handleSubmit}>회원가입</AuthButton>
            <RightAlignedLink to="/login">로그인</RightAlignedLink>
        </AuthContent>
    );
}

export default Register;