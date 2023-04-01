import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import ReviewsList from './ReviewsList';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useEffect, useState } from 'react';
import DetailedItem from './SingleRepositoryView';
import Create from './CreateForm';
import SignUp from './SignUp';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    }
});

const Main = () => {

    const authStorage = useContext(AuthStorageContext);
    var storedToken;
    authStorage.getAccessToken()
    .then(token => storedToken = token);
    const [ token, setToken ] = useState(storedToken)
    
    useEffect(() => {
    
    }, [token])

    /*{!token || token === 'undefined' || token === ""?
                 <SignedOutAppBar setToken={setToken} />:
                 <SignedInAppBar setToken={setToken} />
                }*/

    return (
        <>
            <View style={styles.container}>
                <AppBar token={token} setToken={setToken} />
                <Routes>
                    <Route path="/" element={<RepositoryList />} exact />
                    <Route path="/signin" element={<SignIn setToken={setToken} />} exact />
                    <Route path="/reviews" element={<ReviewsList />} exact />
                    <Route path="/repository/:id" element={<DetailedItem />} />
                    <Route path="/create" element={<Create />} exact />
                    <Route path='/signup' element={<SignUp setToken={setToken}/>} exact />
                    <Route path="*" element={<Navigate to="/" replace/>} />
                </Routes>
            </View>
        </>
    );
};

export default Main;