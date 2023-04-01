import Text from './Text';
import { View, StyleSheet, Dimensions, Image, Pressable, FlatList, ScrollView } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../hooks/useSingleRepository';
import * as Linking from 'expo-linking';
import SingleReview from './SingleReview';



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
        height: 210,
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
    },
    openButtonBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    openButtonStyle: {
        display: 'flex',
        height: 40,
        width: 340,
        backgroundColor: '#1e90ff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listStyle: {
        backgroundColor: "#e1e4e8",
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
        height: 250,
    },
    separator: {
        height: 10,
    },
});

const LanguageDisplay = ({ language }) => {
    return (
        <View style={styles.languageDisplayStyle}>
            <Text fontWeight='bold' style={{color: 'white'}}>{language}</Text>
        </View>
    )
} 

const ItemSeparator = () => <View style={styles.separator} />;



const DetailedItem = () => {

    const { id } = useParams();

    const result = useSingleRepository({ id: id });

    const repository = result.data ?
    result.data.repository
    : {};      

    const reviews = result.data ?
    result.data.repository.reviews.edges.map(edge => edge.node)
    : [];
    

    if(reviews.length === 0 || !reviews || reviews === 'undefined') {
        return (
            <View><Text>Loading reviews...</Text></View>
        )
    }

    const fetchMore = result.fetchMore;

    return (
        <ScrollView style={styles.listStyle}>
            <View style={styles.flexCard}>
                <View style={styles.headStyle}>
                    <Image
                        style={styles.tinyLogo}
                        source={repository.ownerAvatarUrl}
                    />
                    <View style={styles.infoStyle} >
                        <Text fontWeight='bold'>{repository.fullName}</Text>
                        <Text color="textSecondary">{repository.description}</Text>
                        <LanguageDisplay language={repository.language}/>
                    </View>
                </View>
                <View style={styles.dataStyle}>
                    <View style={styles.singleDataStyle}>
                        <Text fontWeight='bold'>{parseNumber(repository.stargazersCount)}</Text>
                        <Text color="textSecondary">Stars</Text>
                    </View>
                    <View style={styles.singleDataStyle}>
                        <Text fontWeight='bold'>{parseNumber(repository.forksCount)}</Text>
                        <Text color="textSecondary">Forks</Text>
                    </View>
                    <View style={styles.singleDataStyle}>
                        <Text fontWeight='bold'>{repository.reviewCount}</Text>
                        <Text color="textSecondary">Reviews</Text>
                    </View>
                    <View style={styles.singleDataStyle}>
                        <Text fontWeight='bold'>{repository.ratingAverage}</Text>
                        <Text color="textSecondary">Rating</Text>
                    </View>
                </View>
                <View style={styles.openButtonBox}>
                    <Pressable onPress={() => Linking.openURL(repository.url)}>
                        <View style={styles.openButtonStyle}>
                            <Text fontWeight='bold' style={{color: 'white'}}>Open in Github</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <ItemSeparator />
            <FlatList 
                data={reviews}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <SingleReview review={item}/> }
                keyExtractor={review => review.id}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.5}
            />
            <View style={{ backgroundColor: "#e1e4e8", 
            height: reviews.length * 170 < Dimensions.get('window').height 
            ? Dimensions.get('window').height - reviews.length * 170
            :20}}> 
            </View>
        </ScrollView>
    )
}

export default DetailedItem;


