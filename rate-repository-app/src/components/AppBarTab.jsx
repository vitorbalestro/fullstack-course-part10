import Text from './Text';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
    appBarText: {
        color: "white",
        fontWeight: 700
    },
})



const AppBarTab = ({ title, route }) => {
    return (
            <Link to={route}>
                <Text style={styles.appBarText}>{title}
                </Text>
            </Link>
    )
}

export default AppBarTab;