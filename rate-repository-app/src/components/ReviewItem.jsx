import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    flexCard: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    headerAndReviewStyle: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        gap: 10,
        paddingLeft: 10,
        paddingTop: 10,
        marginBottom: 15
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
    listStyle: {
        backgroundColor: "#e1e4e8",
        display: "flex",
        gap:10
    },
    buttonsStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
       /* height: 50,*/
    },
    viewButton: {
        display: 'flex',
        height: 40,
        margin: 10,
        padding: 10,
        backgroundColor: '#1e90ff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        display: 'flex',
        height: 40,
        margin: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
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
    
    const navigate = useNavigate();
    const repositoryUrl = `/repository/${review.repositoryId}`
    const deleteReview = useDeleteReview({ id: review.id });

    const handleDelete = () => {
        /*Alert.alert('Delete review', 
        'Are you sure you want to delete this review?',[
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: () => deleteReview()
            }
        ])*/

        deleteReview();

    }
    return( 
        <View style={styles.listStyle}>
            <View style={styles.flexCard}>
                <View style={styles.headerAndReviewStyle}>
                    <RatingCircle rating={review.rating} />
                    <View sytle={styles.contentStyle}>
                        <Text fontWeight='bold'>{review.repository.fullName}</Text>
                        <Text style = {{ paddingTop: 5}} color='textSecondary'>{parseDate(review.createdAt)}</Text>
                        <View style={{ flexDirection: 'row', flexShrink: 1, width: 300 }}>
                            <Text style={{flex: 1, flexWrap: 'wrap', paddingTop:10}}>{review.text}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsStyle}>
                    <Pressable onPress={() => navigate(repositoryUrl)}>
                        <View style={styles.viewButton}>
                            <Text fontWeight='bold' style={{color: 'white'}}>View repository</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={handleDelete}>
                        <View style={styles.deleteButton}>
                            <Text fontWeight='bold' style={{color: 'white'}}>Delete review</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
} 

export default SingleReview;
