import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useSingleRepository = ({ id }) => {
    
    const { data, error, loading } = useQuery(GET_REPOSITORY, { 
        variables: { id: id },
    });

    return { data: data, loading };
}


export default useSingleRepository;
