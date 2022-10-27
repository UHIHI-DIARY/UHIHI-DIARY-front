import React from 'react';
import styled from 'styled-components';

const PageLayout = ({children}) => (
  <Layout>
    {children}
  </Layout>
);

// 화면의 중앙에 위치시킨다
const Layout = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default PageLayout;