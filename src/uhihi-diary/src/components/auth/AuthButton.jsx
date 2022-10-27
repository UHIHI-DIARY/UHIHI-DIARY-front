import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { pointColor, shadow } from '../../lib/styleUtils';

const AuthButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

const Wrapper = styled.div`
    margin-top: 1rem;
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

export default AuthButton;