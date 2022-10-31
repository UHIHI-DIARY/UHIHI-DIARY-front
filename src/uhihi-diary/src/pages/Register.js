import React from 'react';

import { Register } from 'containers/auth';
import {AuthWrapper} from "components/auth";

const Auth = () => (
    <AuthWrapper>
        <Register/>
    </AuthWrapper>
);

export default Auth;