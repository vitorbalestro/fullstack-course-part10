import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable, Dimensions } from 'react-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { string, object, number } from 'yup';
import { useNavigate } from 'react-router-native';


const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const styles = {
    createButton: {
        display: 'flex',
        height: 50,
        margin: 10,
        padding: 10,
        backgroundColor: '#1e90ff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundStyle: {
        backgroundColor: "#e1e4e8",
        height: Dimensions.get('window').height,
    }, 
    formStyle: {
        display: 'flex',
        padding: 10,
        height: 340,
        backgroundColor: 'white'
    },
};

const CreateForm = ({ onSubmit }) => {

    return (
        <View style={styles.backgroundStyle}>
        <View style={styles.formStyle}>
                <FormikTextInput name="repositoryName" placeholder='Repository name' />
                <FormikTextInput name='ownerName' placeholder='Repository owner' />
                <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
                <FormikTextInput name='text' placeholder='Review text' />
                <Pressable onPress={onSubmit}>
                    <View style={styles.createButton}>
                        <Text fontWeight='bold' style={{color: 'white'}}>Create</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )

};

const Create = () => {

    const [ createReview, result ] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            console.log(error.graphQLErrors[0])
        }
    })

    const navigate = useNavigate();

    const onSubmit = async (values) => {

        const { ownerName, repositoryName, rating, text } = values;

        try{
            const result = await createReview({ variables: { ownerName, repositoryName, rating: Number(rating), text }});
            const repositoryId = result.data.createReview.repositoryId
            navigate(`/repository/${repositoryId}`);
        } catch(error) {
            console.log(error);
        }
    };

    const validationSchema = object().shape({
        repositoryName: string().required('Repository name is required'),
        ownerName: string().required('Owner name is required'),
        rating: number().required('Rating is required')
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <CreateForm onSubmit={handleSubmit}/>}
        </Formik>
    )
};

export default Create;