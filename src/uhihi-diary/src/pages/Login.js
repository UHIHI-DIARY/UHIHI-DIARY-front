import { Login } from '../containers/auth';
import {AuthWrapper} from "../components/auth";

function Auth() {
    
    return(
        <div>
            <AuthWrapper>
                <Login/>
            </AuthWrapper>
        </div>
    );
}

export default Auth;