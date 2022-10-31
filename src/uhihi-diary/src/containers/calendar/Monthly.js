import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Section } from 'components/monthly';
import { RowCollocateAround, RowCollocateBetween } from 'components/common';
import DiaryName from 'components/monthly/DiaryName';

const Monthly = () => {

    let diaryName = "Jeongmin's";

    return (
        <div>
            <Header>
                <RowCollocateBetween>
                    <DiaryName diaryName={diaryName}/>
                </RowCollocateBetween>
            </Header>
            <Section>
            </Section>
        </div>
    );
}

export default Monthly;