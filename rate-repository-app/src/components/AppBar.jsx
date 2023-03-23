import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap:10
    },
    appBar: {
        backgroundColor: theme.colors.appBarBackground,
    },
    
});

const AppBar = () => {
    const appBarStyles = [ styles.container, styles.appBar ];
    return (
        <View style={appBarStyles}> 
            <ScrollView  contentContainerStyle={{ gap: 15 }} horizontal>
                <AppBarTab title="Repositories" route="/" />
                <AppBarTab title="Sign In" route="/signin"/>
            </ScrollView>
        </View>
    );
};

export default AppBar;