import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable, Dimensions } from 'react-native';
import { CREATE_NEW_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useSignIn from '../hooks/useSignIn';
import { string, object, ref } from 'yup';
import { useNavigate } from 'react-router-native';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';


const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
};

const styles = {
    backgroundStyle: {
        backgroundColor: "#e1e4e8",
        height: Dimensions.get('window').height,
    }, 
    formStyle: {
        display: 'flex',
        padding: 10,
        height: 300,
        backgroundColor: 'white'
    },
    signUpButton: {
        display: 'flex',
        height: 50,
        margin: 10,
        padding: 10,
        backgroundColor: '#1e90ff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.backgroundStyle}>
            <View style={styles.formStyle}>
                <FormikTextInput name='username' placeholder='Username' />
                <FormikTextInput name='password' placeholder='Password' secureTextEntry='true' />
                <FormikTextInput name='confirmPassword' placeholder='Confirm password' secureTextEntry='true'/>
                <Pressable onPress={onSubmit} >
                    <View style={styles.signUpButton}>
                        <Text fontWeight='bold' style={{color: 'white'}}>Sign Up</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
};

const SignUp = ({ setToken }) => {

    const [ createUser, result ] = useMutation(CREATE_NEW_USER, {
        onError: (error) => {
            console.log(error.graphQLErrors[0])
        }
    });
    
    const [ signIn ] = useSignIn();
    const authStorage = useContext(AuthStorageContext);

    const navigate = useNavigate();

    const onSubmit = async (values) => {

        const { username, password } = values;

        try {
            await createUser({ variables: { username, password }});
            await signIn({ username, password });
            setToken(authStorage.getAccessToken());
            navigate('/');
        } catch(error) {
            console.log(error);
        }
        console.log(values);
    }

    const validationSchema = object().shape({
        username: string().required('Username is required').min(1, 'Username must have at least 1 character')
        .max(30, 'Username must have at most 30 characters'),
        password: string().required('Password is required').min(5, 'Password must have at least 5 characters')
        .max(50, 'Password must have at most 50 characters'),
        confirmPassword: string()
        .oneOf([ref('password'), null],'Passwords do not match')
        .required('Password confirm is required'),
    })

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    )
}

export default SignUp;