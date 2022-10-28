import React from 'react';
import styled from 'styled-components';

const RowCollocateRight = ({children}) => (<Collocater>{children}</Collocater>)

const Collocater = styled.div`
    display: flex;
    align-items: center;
    justify-content:flex-end
`;

export default RowCollocateRight;
