import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import ViewMoreText from 'react-native-view-more-text';

const styles = StyleSheet.create({
    flexCard: {
        display: 'flex',
        backgroundColor: 'white',
        height: 260,
        gap: 10
    },
    headStyle: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
    infoStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap:10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    },
    reviewStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:10,
        paddingTop: 20,
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
})


const ReviewItem = ({ item }) => {

  
    return (
        <View style={styles.flexCard}>
            <View style={styles.headStyle}>
                <Image
                    style={styles.tinyLogo}
                    source={item.repository.ownerAvatarUrl}
                />
            </View>
            <View style={styles.infoStyle} >
                <Text fontWeight='bold'>{item.repository.fullName}</Text>
                <Text color="textSecondary">{item.repository.description}</Text>
            </View>        
            <View style={styles.reviewStyle}>
                <Text fontWeight='bold'>Review</Text>
                <Text>
                    {item.text}
                </Text>
            </View>
        </View>
    )
}

export default ReviewItem;