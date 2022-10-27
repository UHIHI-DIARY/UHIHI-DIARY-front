import React from 'react';
import styled from 'styled-components';
import "../../css/Loading.css";

const Loading = () => (
    <div className = "load">
        <Line className = "line"></Line>
        <Line className = "line"></Line>
        <Line className = "line"></Line>
    </div>
);

const Line = styled.div`
    display: inline-block;
    width:20px;
    height: 20px;
    margin: 0px 1px;
    border-radius: 15px;
    background-color: #F28482;
`

export default Loading;