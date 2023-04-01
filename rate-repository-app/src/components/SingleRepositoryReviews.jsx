import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../hooks/useSingleRepository';
import SingleReview from './SingleReview';

const styles = StyleSheet.create({ 
    separator: {
        height: 10,
    },
    listStyle: {
        backgroundColor: "#e1e4e8",
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
    },
});

const SingleRepositoryReviews = () => {

    const { id } = useParams();
    
    const result = useSingleRepository({id: id});

    const reviews = result.data ?
    result.data.repository.reviews.edges.map(edge => edge.node)
    : [];
    
    if(reviews.length === 0 || !reviews || reviews === 'undefined') {
        return (
            <View><Text>Loading reviews...</Text></View>
        )
    }

    console.log(reviews);
    
    return (
        <View style={styles.listStyle}>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <SingleReview review={item}/> }
                keyExtractor={review => review.id}
            />
        </View>
    )
}

export default SingleRepositoryReviews;