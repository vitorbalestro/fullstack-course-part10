import { View, StyleSheet } from 'react-native';
import Text from './Text';


const styles = StyleSheet.create({
    flexCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 200,
        gap: 10,
        paddingLeft: 10,
        paddingTop: 10
    },
    ratingCircle: {
        display: 'flex',
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: '#1e90ff',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap:10,
        alignItems: 'left',
        paddingTop: 5,
    },
    separator: {
        height: 10,
    }, 
    backStyle: {
        backgroundColor: "#e1e4e8",
        display: "flex",
        gap:10
    },
    
})


const RatingCircle = ({ rating }) => {
    return (
        <View style={styles.ratingCircle}>
            <Text style={{color: '#1e90ff'}}>{rating}</Text>
        </View>
    )
}

function parseDate(date) {
    
    const dateBlock = date.split('T')[0];
    const dateArray = dateBlock.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    
    const outputDate = day + '.' + month + '.' + year;
    return outputDate;
}

const SingleReview = ({ review }) => {
    
    return( 
       
            <View style={styles.flexCard}>
                <RatingCircle rating={review.rating} />
                <View sytle={styles.contentStyle}>
                    <Text fontWeight='bold'>{review.user.username}</Text>
                    <Text style = {{ paddingTop: 5}} color='textSecondary'>{parseDate(review.createdAt)}</Text>
                    <View style={{height: 100, width: 300}}>
                        <Text style={{paddingTop:20}}>{review.text}</Text>
                    </View>
                </View>
            </View>
    )
} 

export default SingleReview;

