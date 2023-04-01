import { FlatList, View, StyleSheet, Dimensions, Text } from 'react-native';
import { Menu, Button, Provider, Searchbar } from 'react-native-paper';
import Item from './RepositoryItem';
import useRepositories from '../hooks/useRepository';
import { useState } from 'react';
import { IoMdArrowDropdown} from 'react-icons/io';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({ 
    separator: {
        height: 10,
    },
    listStyle: {
        backgroundColor: "#e1e4e8",
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
        height: 250
    },
    menuStyle: {
        elevation: 3,
        zIndex: 3
    }
});


const ItemSeparator = () => <View style={styles.separator} />;



const HeaderMenu = ({ orderBy, orderDirection, setOrderBy, setOrderDirection,
                        searchQuery, setSearchQuery }) => {

    const onChangeSearch = (query) => setSearchQuery(query);

    const [ visible, setVisible ] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    function menuString() {
        if(orderBy === 'RATING_AVERAGE' && orderDirection === 'DESC' ) return 'Highest rated repositories';
        if(orderBy === 'RATING_AVERAGE' && orderDirection === 'ASC' ) return 'Lowest rated repositories';
        else return 'Latest repositories';
    }

    return (
        <View>
            <Searchbar 
                placeholder=""
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ backgroundColor:'white', height:40, marginTop: 10, marginLeft: 5, marginRight: 5 }}
                inputStyle={{ paddingBottom: 15 }}
                />
            <Provider>
                <View 
                    style={{
                        paddingTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <Menu
                        contentStyle={{ backgroundColor: 'white' }}
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button style={{ color: 'black' }} onPress={openMenu}>
                            <Text style={{ color: 'black' }}>{menuString()}</Text> <IoMdArrowDropdown style={{ color:'black'}}/></Button>}
                        anchorPosition='top'>   
                        <Menu.Item onPress={() => {}} style={{ backgroundColor: 'white' }} title='Select an item...' disabled/>
                        <Menu.Item onPress={()=>{
                            setOrderBy('');
                            setOrderDirection('');
                            setVisible(false);
                        }} style={{ backgroundColor: 'white' }} title="Latest repositories"/>
                        <Menu.Item onPress={()=>{
                            setOrderBy('RATING_AVERAGE');
                            setOrderDirection('DESC');
                            setVisible(false);
                        }} style={{ backgroundColor: 'white' }} title="Highest rated repositories"/>
                        <Menu.Item onPress={()=>{
                            setOrderBy('RATING_AVERAGE');
                            setOrderDirection('ASC');
                            setVisible(false);
                        }} style={{ backgroundColor: 'white' }} title="Lowest rated repositories"/>
                    </Menu>
                </View>
            </Provider>
        </View>
    )
}

const RepositoryList = () => {

    const [ orderBy, setOrderBy ] = useState('');
    const [ orderDirection, setOrderDirection ] = useState('');
    const [ searchQuery, setSearchQuery ] = useState('');

    const [ value ] = useDebounce(searchQuery, 500);

    const { repositories, fetchMore } = useRepositories({ orderBy: orderBy, 
        orderDirection: orderDirection, searchKeyword: value });
    
    const repositoryNodes = repositories 
    ? repositories.repositories.edges.map(edge => edge.node)
    : [];
    

    return (
        <View style={styles.listStyle}>
            <FlatList
                ListHeaderComponent={<HeaderMenu orderBy={orderBy} orderDirection={orderDirection}
                    setOrderBy={setOrderBy} setOrderDirection={setOrderDirection}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
                ListHeaderComponentStyle={styles.menuStyle}
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => ( <Item item={item} /> )}
                keyExtractor={item => item.id}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.7}
            />
            <View style={{backgroundColor: "#e1e4e8", 
            height: repositoryNodes.length * 170 < Dimensions.get('window').height 
            ? Dimensions.get('window').height - repositoryNodes.length * 170
            :20}}> 
            </View>
        </View>
    );   
};

export default RepositoryList;