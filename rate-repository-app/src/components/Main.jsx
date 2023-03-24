import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import ReviewsList from './ReviewsList';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    }
});

const Main = () => {

    const authStorage = useContext(AuthStorageContext);
    const [ token, setToken ] = useState(authStorage.getAccessToken()); ;
    
    useEffect(() => {
    }, [token])

    return (
        <>
            <View style={styles.container}>
                <AppBar token={token} setToken={setToken} />
                    <Routes>
                        <Route path="/" element={<RepositoryList />} exact />
                        <Route path="/signin" element={<SignIn setToken={setToken} />} exact />
                        <Route path="/reviews" element={<ReviewsList />} exact />
                        <Route path="*" element={<Navigate to="/" replace/>} />
                    </Routes>
            </View>
        </>
    );
};

export default Main;