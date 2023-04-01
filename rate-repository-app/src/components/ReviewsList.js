import useReviews from '../hooks/useReviews';
import { Dimensions, View, FlatList, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({ 
    separator: {
        height: 10,
    },
    listStyle: {
        backgroundColor: "#e1e4e8",
        display: "flex",
        /*flexGrow: 1,
        flexShrink: 1,*/
    },
});


const ReviewsList = () => {
    const { reviews } = useReviews();
    const reviewNodes = reviews ?
    reviews.me.reviews.edges.map(edge => edge.node)
    : [];

   

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <View>
            <FlatList style={styles.listStyle}
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem review={item}/>}
                keyExtractor={item => item.repository.fullName}
            />
            <View style={{backgroundColor: "#e1e4e8", 
            height: reviewNodes.length * 210 < Dimensions.get('window').height 
            ? Dimensions.get('window').height - reviewNodes.length * 210
            :20}}> 
            </View>
        </View>
    );  
    
};

export default ReviewsList;