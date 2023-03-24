import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable } from 'react-native';
import { string, object } from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const initialValues = {
    username: '',
    password: '',
};

const styles = {
    loginButton: {
        display: 'flex',
        height: 50,
        margin: 10,
        padding: 10,
        backgroundColor: '#1e90ff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const LoginForm = ({ onSubmit }) => {

    return(
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry="true" />
            <Pressable onPress={onSubmit}>
                <View style={styles.loginButton}>
                    <Text fontWeight={700} style={{color: 'white'}}>Sign In</Text>
                </View>
            </Pressable>
        </View>
    ); 
};

const SignIn = ({ setToken }) => {

    const [ signIn ] = useSignIn();
    const authStorage = useContext(AuthStorageContext);
    const navigate = useNavigate();

    const onSubmit = async (values) => {

        const { username, password } = values;

        try {
            await signIn({ username, password });
            setToken(authStorage.getAccessToken());
            navigate('/reviews');
            
        } catch(e) {
            console.log(e);
        }
        
    }

    const validationSchema = object().shape({
        username: string().required('Username is required'),
        password: string().required('Password is required'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;