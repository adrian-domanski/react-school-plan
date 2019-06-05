const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
            console.log('user sign in success')
            return {
                ...state,
                authError: null
            }
        case 'SIGN_IN_ERROR':
            console.log('sign in error action:', action.err.message);
            return {
                ...state,
                authError: 'Błąd w czasie logowania'
            }
        case 'SIGN_OUT_SUCCESS':
            console.log('sign out success');
            return state;
        default:
            return state;
    }
}

export default authReducer