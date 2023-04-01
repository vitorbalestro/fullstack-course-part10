import { useQuery } from '@apollo/client';
import { GET_USER_REVIEWS } from '../graphql/queries';

const useReviews = () => {

    const { data, error, loading } = useQuery(GET_USER_REVIEWS,{
        fetchPolicy: 'network-only',
    });
    return { reviews: data, loading };

}

export default useReviews;