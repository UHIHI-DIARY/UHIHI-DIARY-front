import React from 'react';

import { Login } from 'containers/auth';
import {AuthWrapper} from "components/auth";

const Auth = () => (
        <AuthWrapper>
            <Login/>
        </AuthWrapper>
)

export default Auth;