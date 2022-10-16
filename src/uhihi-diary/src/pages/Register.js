import { Register } from '../containers/auth';
import {AuthWrapper} from "../components/auth";

function Auth() {
    
    return(
        <div>
            <AuthWrapper>
                <Register/>
            </AuthWrapper>
        </div>
    );
}

export default Auth;