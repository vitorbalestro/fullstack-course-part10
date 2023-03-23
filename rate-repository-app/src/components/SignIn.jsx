import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable } from 'react-native';
import { string, object } from 'yup';

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

const SignIn = () => {

    const onSubmit = values => {
        console.log(values.username);
        console.log(values.password);
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