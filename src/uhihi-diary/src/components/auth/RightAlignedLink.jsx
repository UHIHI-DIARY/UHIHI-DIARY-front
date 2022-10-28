import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const RightAlignedLink = ({to, children}) => (
    <Aligner>
        <StyledLink to={to}>{children}</StyledLink>
    </Aligner>
);

const Aligner = styled.div`
    margin-top: 1rem;
    margin-left:10px;
    text-align: right;
`;

const StyledLink = styled(Link)`
    color: ${oc.gray[6]};
    &:hover {
        color: ${oc.gray[7]};
    }
`
export default RightAlignedLink;