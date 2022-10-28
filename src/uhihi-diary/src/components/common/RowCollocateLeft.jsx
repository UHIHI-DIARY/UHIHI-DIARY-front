import React from 'react';
import styled from 'styled-components';

const RowCollocateLeft = ({children}) => (<Collocater>{children}</Collocater>)

const Collocater = styled.div`
    display: flex;
    align-items: center;
    justify-content:flex-start;
`;

export default RowCollocateLeft;
