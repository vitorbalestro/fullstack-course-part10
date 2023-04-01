import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';


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
        paddingLeft:5
    },
    
});

const appBarStyles = [ styles.container, styles.appBar ];

const SignedInAppBar = ({ setToken }) => {
    return (
        <View style={appBarStyles}> 
            <ScrollView  contentContainerStyle={{ gap: 15 }} horizontal>
                <AppBarTab title="Repositories" route="/" />
                <AppBarTab title="Create a Review" route="/create" />
                <AppBarTab title="My Reviews" route="/reviews" />
                <SignOutTab setToken={setToken}/>
            </ScrollView>
        </View>
    )
};

const SignedOutAppBar = ({ setToken }) => {
    return (
        <View style={appBarStyles}> 
            <ScrollView  contentContainerStyle={{ gap: 15 }} horizontal>
                <AppBarTab title="Repositories" route="/"/>
                <AppBarTab title="Sign In" route="/signin" setToken={setToken}/>
                <AppBarTab title='Sign Up' route='/signup' />
            </ScrollView>
        </View>
    )
};


const AppBar = ({ token, setToken }) => {

    {return !token || token === 'undefined' || token === "" ? <SignedOutAppBar setToken={setToken} /> : <SignedInAppBar setToken={setToken} />};

};


export default AppBar;
