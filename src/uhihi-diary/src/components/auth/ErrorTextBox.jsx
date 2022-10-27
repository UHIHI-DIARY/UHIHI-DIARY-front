import React from 'react';
import styled from 'styled-components';
import { pointColor } from '../../lib/styleUtils';

const ErrorTextBox = ({text, display})=>(
    <Wrapper display={display}>
        {text}
    </Wrapper>
);

const Wrapper = styled.div`
    margin-top: 3px;
    font-size: 1rem;
    color: ${pointColor[0]};
    margin-left:6px;
`

export default ErrorTextBox;