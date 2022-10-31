import React from 'react';
import styled from 'styled-components';

import { pointColor, shadow } from 'lib/styleUtils';

const Section = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
)

const Wrapper = styled.div`
`;

export default Section;