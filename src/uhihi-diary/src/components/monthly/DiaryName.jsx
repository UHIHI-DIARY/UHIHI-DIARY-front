import React from 'react';
import styled from 'styled-components';

import { pointColor, shadow } from 'lib/styleUtils';

const DiaryName = ({diaryName}) => (
    <Wrapper>
        <Name>
        {diaryName} Diary
        </Name>
    </Wrapper>
)

const Wrapper = styled.div`
    height:70px;
    margin-left:10px;
    
    
`;

const Name = styled.div`
    font-size:30px;
    color:#222222;
    line-height: 70px;
`

export default DiaryName;