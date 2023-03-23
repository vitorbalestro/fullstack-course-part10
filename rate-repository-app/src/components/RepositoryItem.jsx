import Text from './Text';
import { View, StyleSheet, Image } from 'react-native';

function parseNumber( value ) {
    var stringToDisplay;
    if(value > 1000) {
        const approximatedValue = Number.parseInt(value / 1000);
        const decimal = Number.parseInt((value - approximatedValue * 1000)/100);
        
        if(decimal === 0){
            stringToDisplay = approximatedValue.toString() + 'k';
        } else if(decimal < 10){
            stringToDisplay = approximatedValue.toString() + '.' + decimal.toString() + 'k';
        } else{
            stringToDisplay = (approximatedValue+1).toString() + 'k';
        }
    }
    return stringToDisplay;
}

const styles = StyleSheet.create({
    flexCard: {
        display: 'flex',
        backgroundColor: 'white',
        height: 160,
        gap: 10

    },
    headStyle: {
        paddingTop: 5,
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'left',
    },
    infoStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap:10,
        alignItems: 'left',
        paddingTop: 5
    },
    dataStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
    },
    singleDataStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    languageDisplayStyle: {
        display: 'flex',
        height: 35,
        width: 80,
        backgroundColor: '#1e90ff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const LanguageDisplay = ({ language }) => {
    return (
        <View style={styles.languageDisplayStyle}>
            <Text fontWeight='bold' style={{color: 'white'}}>{language}</Text>
        </View>
    )
} 

const Item = ({ item }) => {
    return (
        <View style={styles.flexCard}>
            <View style={styles.headStyle}>
                <Image
                    style={styles.tinyLogo}
                    source={item.ownerAvatarUrl}
                />
                <View style={styles.infoStyle} >
                    <Text fontWeight='bold'>{item.fullName}</Text>
                    <Text color="textSecondary">{item.description}</Text>
                    <LanguageDisplay language={item.language}/>
                </View>
            </View>
            <View style={styles.dataStyle}>
                <View style={styles.singleDataStyle}>
                    <Text fontWeight='bold'>{parseNumber(item.stargazersCount)}</Text>
                    <Text color="textSecondary">Stars</Text>
                </View>
                <View style={styles.singleDataStyle}>
                    <Text fontWeight='bold'>{parseNumber(item.forksCount)}</Text>
                    <Text color="textSecondary">Forks</Text>
                </View>
                <View style={styles.singleDataStyle}>
                    <Text fontWeight='bold'>{item.reviewCount}</Text>
                    <Text color="textSecondary">Reviews</Text>
                </View>
                <View style={styles.singleDataStyle}>
                    <Text fontWeight='bold'>{item.ratingAverage}</Text>
                    <Text color="textSecondary">Rating</Text>
                </View>
            </View>
        </View>
    )
}

export default Item;