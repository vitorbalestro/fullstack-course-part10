import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {

    var result; 
    if(orderBy !== ''){
        
        result = useQuery(GET_REPOSITORIES,{
            variables: { orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchKeyword },
            fetchPolicy: 'cache-and-network',
        });
    } else {
        result = useQuery(GET_REPOSITORIES,{
            variables: { searchKeyword: searchKeyword },
            fetchPolicy: 'cache-and-network',
        });
    }

    return { repositories: result.data, loading: result.loading };
}


export default useRepositories;