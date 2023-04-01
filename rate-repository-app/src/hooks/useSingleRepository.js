import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useSingleRepository = ({ id }) => {

    
    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, { 
        variables: { id: id, first: 6 },
    });

    const handleFetchMore = () => {

        console.log('end reached');

        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if(!canFetchMore) {
            return;
        };

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
            },
        });

        return {
            data: {
                ...data,
                repository: {
                    reviews: data?.repository.reviews,
                },
            },
            fetchMore: handleFetchMore,
            loading,
            ...result
        }
    };

    return { data: data, loading: loading, fetchMore: handleFetchMore };
}


export default useSingleRepository;
