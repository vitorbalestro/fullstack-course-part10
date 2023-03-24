import Text from './Text';
import { StyleSheet, Pressable } from 'react-native';
import useSignOut from '../hooks/useSignOut';
import { useNavigate } from 'react-router-native';



const styles = StyleSheet.create({
    appBarText: {
        color: "white",
        fontWeight: 700
    },
})

const SignOutTab = ({ setToken }) => {
    
    const signOut = useSignOut();

    const navigate = useNavigate();

    
    const onPress = () => {
        signOut();
        setToken('');
        navigate('/');
    }
    
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.appBarText}>Sign Out
            </Text>
        </Pressable>
    )
}

export default SignOutTab;
