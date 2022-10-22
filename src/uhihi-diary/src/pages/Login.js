import React from 'react';
import { Login } from '../containers/auth';
import {AuthWrapper} from "../components/auth";

function Auth() {
    
    return(
        <AuthWrapper>
            <Login/>
        </AuthWrapper>
    );
}

export default Auth;