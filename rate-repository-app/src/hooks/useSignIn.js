import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';


const useSignIn = () => {

    const [ mutation, result ] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
    
        return await mutation({ variables: { credentials: { username: username, password: password } } });
        

    }

    return [ signIn, result ];
}

export default useSignIn;