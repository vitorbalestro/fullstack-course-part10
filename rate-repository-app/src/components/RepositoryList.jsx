import { FlatList, View, StyleSheet } from 'react-native';
import Item from './RepositoryItem';
import useRepositories from '../hooks/useRepository';

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

const RepositoryList = () => {

    const { repositories } = useRepositories()
    
    const repositoryNodes = repositories 
    ? repositories.repositories.edges.map(edge => edge.node)
    : [];

    
    
    return (
        <View style={styles.listStyle}>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => ( <Item item={item} /> )}
                keyExtractor={item => item.id}
            />
        </View>
    );   
};

export default RepositoryList;