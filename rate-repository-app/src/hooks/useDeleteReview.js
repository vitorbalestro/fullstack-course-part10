import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_USER_REVIEWS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const useDeleteReview = ({ id }) => {
    const [ mutation, result ] = useMutation(DELETE_REVIEW,{
        onError: (error) => {
            console.log(error.graphQLErrors[0]);
        },
        refetchQueries: () => [{
            query: GET_USER_REVIEWS
        }]
    });
     

    const deleteReview = async () => {
        await mutation({ variables: { id: id }},
            );
    }

    return deleteReview;

};

export default useDeleteReview;