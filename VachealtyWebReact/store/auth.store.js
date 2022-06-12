import {createAction, createReducer} from "deox";
import {auth} from "../firebase/config";
import {userService} from "../firebase/services/user.service";

export const authLoginAction = createAction(
    'authLoginAction',
    resolve => (user) => resolve({
        user
    })
);

const logoutAction = createAction(
    'authLogoutAction',
);

const defaultState = {
    isLoggedIn: false,
    user: undefined,
};

export const authReducer = createReducer(defaultState, handle => [
    handle(authLoginAction, (state, action) => {
        const {user} = action.payload;
        return {...state, isLoggedIn: true, user};
    }),
    handle(logoutAction, (state) => {
        return {...state, isLoggedIn: false, user: undefined};
    }),
]);

export const authAsyncLogoutAction = () => async dispatch => {
    await auth.signOut();
    dispatch(logoutAction());
};

export const handleUser = async (user, dispatch) => {
    let profile = await userService.getUserById(user.uid);
    const venues = await userService.getUserVenues(profile);
    profile = {
        ...profile,
        venues,
    };
    dispatch(authLoginAction(profile));
};