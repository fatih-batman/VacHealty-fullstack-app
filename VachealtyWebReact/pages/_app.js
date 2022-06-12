import '../styles/globals.css'
import {Provider, useDispatch} from "react-redux";
import {store} from "../store";
import {useEffect, useState} from "react";
import {handleUser} from "../store/auth.store";
import {auth} from "../firebase/config";
import 'bootstrap/dist/css/bootstrap.css';
import './auth/loginPage.css';
import '../styles/events.css'
import '../styles/voucher.css';
import '../styles/checkin.css';
import '../styles/barkeeper.css';
import '../styles/menu.css';
import '../styles/eventList.css';
import '../styles/settings.css';
import '../styles/fonts/icon.css';
import '../styles/dashboard.css';

const AppWrapper = ({children}) => {
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user && user.uid) {
                await handleUser(user, dispatch);
            }
            setInitialized(true);
        }, () => setInitialized(true), () => setInitialized(true));
    }, []);

    return (
        <>
            {initialized && children}
        </>
    );
};

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        </Provider>
    );
}

export default MyApp;
