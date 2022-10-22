import React from 'react';
import { Register } from '../containers/auth';
import {AuthWrapper} from "../components/auth";

function Auth() {
    
    return(
        <AuthWrapper>
            <Register/>
        </AuthWrapper>
    );
}

export default Auth;