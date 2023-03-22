import Text from './Text';
import { StyleSheet, Pressable } from 'react-native';

const styles = StyleSheet.create({
    appBarText: {
        color: 'white',
        fontWeight: 700
    },
})


const AppBarTab = ({ title }) => {
    return (
        <Pressable>
            <Text style={styles.appBarText}>{title}
            </Text>
        </Pressable>
    )
}

export default AppBarTab;