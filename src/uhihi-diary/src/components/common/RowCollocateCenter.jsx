import React from 'react';
import styled from 'styled-components';

const RowCollocateCenter = ({children}) => (<Collocater>{children}</Collocater>)

const Collocater = styled.div`
    display: flex;
    align-items: center;
    justify-content:center
`;

export default RowCollocateCenter;
