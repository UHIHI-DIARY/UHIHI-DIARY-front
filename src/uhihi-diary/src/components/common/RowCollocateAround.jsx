import React from 'react';
import styled from 'styled-components';

const RowCollocateAround = ({children}) => (<Collocater>{children}</Collocater>)

const Collocater = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-around
`;

export default RowCollocateAround;
