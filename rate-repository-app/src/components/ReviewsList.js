import useReviews from '../hooks/useReviews';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

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

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewsList = () => {
    const { reviews } = useReviews();
    const reviewNodes = reviews ?
    reviews.me.reviews.edges.map(edge => edge.node)
    : [];
    
    return (
        <View>
            <FlatList style={styles.listStyle}
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem item={item}/>}
                keyExtractor={item => item.repository.fullName}
            />
        </View>
    );  
    
}

export default ReviewsList;