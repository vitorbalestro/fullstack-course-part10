import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {

    var rawResult; 
    if(orderBy !== ''){
        
        rawResult = useQuery(GET_REPOSITORIES,{
            variables: { orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchKeyword, first: 5 },
            fetchPolicy: 'cache-and-network',
        });
    } else {
        rawResult = useQuery(GET_REPOSITORIES,{
            variables: { searchKeyword: searchKeyword, first: 5 },
            fetchPolicy: 'cache-and-network',
        });
    }

    const { data, loading, fetchMore, ...result } = rawResult;

    const handleFetchMore = () => {

        console.log('end reached')
        
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if(!canFetchMore) {
            return;
        };

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
            },
        });

        return {
            repositories: data?.respositories,
            fetchMore: handleFetchMore,
            loading,
            ...result
        }
    };

    return { repositories: data, loading: result.loading, fetchMore: handleFetchMore };
}


export default useRepositories;