import { TextInput as NativeTextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        placeholderTextColor: '#a9a9a9',
        borderColor: '#a9a9a9',
    },
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = styles.input;
    
    return <NativeTextInput style={[textInputStyle, error && { borderColor:'#d73a4a' }]} {...props} />;
};

export default TextInput;