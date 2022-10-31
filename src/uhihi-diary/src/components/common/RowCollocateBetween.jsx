import React from 'react';
import styled from 'styled-components';

const RowCollocateBetween = ({children}) => (<Collocater>{children}</Collocater>)

const Collocater = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    
`;

export default RowCollocateBetween;
