import { Text, View, FlatList, StyleSheet } from 'react-native';

const ReviewItem = ({ item }) => {
    return (
        <View>
        <Text>{item.repository.fullName}</Text>
        <Text>{item.repository.description}</Text>
        <Text>{item.text}</Text>
        </View>
    )
}

export default ReviewItem;