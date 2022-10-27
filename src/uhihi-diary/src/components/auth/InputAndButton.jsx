import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { pointColor, shadow } from '../../lib/styleUtils';

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputAndButton = ({label, inputText, onClick, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <FlexBox>
            <Input {...rest}/>
            <ButtonWrapper onClick={onClick}>
                {inputText}
            </ButtonWrapper>
        </FlexBox>
    </Wrapper>
);

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const FlexBox = styled.div`
    display:flex;
    justify-content: space-between;
`

const Input = styled.input`
    width: 70%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placeholder {
        color: $(oc.gray[3]);
    }
`;

const ButtonWrapper = styled.div`
    width:30%;
    margin-left:2%;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: ${pointColor[1]};
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: ${pointColor[0]};
        ${shadow(0)}
    }

    &:active {
        background: ${pointColor[0]};
    }

    

`;

export default InputAndButton;