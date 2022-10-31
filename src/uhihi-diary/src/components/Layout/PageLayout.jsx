import React from 'react';
import styled from 'styled-components';

const PageLayout = ({children}) => (
  <Layout>
    {children}
  </Layout>
);

const Layout = styled.div`
  margin:25px;
`;

export default PageLayout;