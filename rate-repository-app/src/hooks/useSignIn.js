import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {

    const [ mutation, result ] = useMutation(AUTHENTICATE);
    const authStorage = useContext(AuthStorageContext);

    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
    
        const { data } = await mutation({ variables: { credentials: { username: username, password: password } } });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return data;

    }

    return [ signIn, result ];
}

export default useSignIn;