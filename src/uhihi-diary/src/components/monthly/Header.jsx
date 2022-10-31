import React from 'react';
import styled from 'styled-components';
import { pointColor, shadow } from '../../lib/styleUtils';

const Header = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
)

const Wrapper = styled.div`
    height: 70px;
    margin-bottom: 10px;
`;

export default Header;