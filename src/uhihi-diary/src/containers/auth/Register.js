import React, { useEffect, useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, InputAndButton } from '../../components/auth';


function Register() {

    const [email, setEmail] = useState("");
    const [checkcode, setCheckcode] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [emailButtonText, setEmailButtonText] = useState("인증 요청");
    const [alreadyEmailCheck, setAlreadyEmailCheck] = useState(false);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handleCheckcodeChange = (event) => {
        setCheckcode(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCheckPasswordChange = (event) => {
        setCheckPassword(event.target.value);
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const emailSendingRequest = (event) => {
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

    const emailCheckingRequest = (event) => {
        if(isSending && !alreadyEmailCheck){
            event.preventDefault();
            setIsChecking(true);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
    }

    // 이메일 송신 요청
    useEffect(()=>{
        if(isSending){
            setEmailButtonText("인증 재요청");
            // 서버에 이메일 송신 요청 보내기

        }
    }, [isSending]);

    // 이메일 확인코드 체크 요청
    useEffect(()=>{
        if(isChecking){
            // 이메일 확인코드 알맞은지 서버에 확인 요청

            // 알맞는 경우
            if(true){
                setIsSending(false);
                setEmailButtonText("인증 완료");
                setAlreadyEmailCheck(true);
            }
            // 틀린 경우
            else{
                ;
            }
        }
    }, [isChecking]);

    // 회원가입 요청
    useEffect(()=>{
        (async function(){
            if(isLoading){
                if(!emailErrorText){
                    await new Promise((r) => setTimeout(r,2000));
                }
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
            <InputWithLabel label="닉네임" name="username" placeholder="닉네임" onChange={handleNicknameChange}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={handlePasswordChange}/>
            <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={handleCheckPasswordChange}/>
            <AuthButton onClick={handleSubmit}>회원가입</AuthButton>
            <RightAlignedLink to="/login">로그인</RightAlignedLink>
        </AuthContent>
    );
}

export default Register;