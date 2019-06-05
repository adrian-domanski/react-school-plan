const notifReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_NOTIF_SUCCESS':
            console.log('Notif created success!')
            return state;
        case 'NOTIF_OUTDATE_DELETED':
            console.log('Notif outdated deleted success!')
            return state;
        case 'NOTIF_DELETED_SUCCESS':
            console.log('Notif deleted success');
            return state;
        default:
            return state;
    }
}

export default notifReducer