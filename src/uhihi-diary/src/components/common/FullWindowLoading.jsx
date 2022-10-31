import React from 'react';
import styled from 'styled-components';

import Loading from './Loading';

const FullWindowLoading = (display) => (
    <Window display={display}>
        <Wrap>
            <Loading/>
        </Wrap>        
    </Window>
);

const Window = styled.div`
    z-index: 1000;
    position: absolute;
    width: 100%; height: 100%;
    left: 0; top: 0;
    background-color: rgba(0,0,0, 0.1);
    overflow-x: hidden;
`;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    height:100%;
`;

export default FullWindowLoading;