const initState = {
    tasks: [
        { id: 1, title: 'Sprawdzian gogol', content: 'Naucz się na niego', group: 'i', date: new Date() },
        { id: 2, title: 'Zadanie matematyka', content: 'Naucz się na niego', group: 'all', date: new Date() }
    ],
    sortBy: 'all_groups'
}


const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TASK_SUCCESS':
            console.log('task created success!!!')
            return state;
        case 'CREATE_TASK_ERROR':
            console.log('create task ERROR', action.err)
            return state;
        case 'DELETE_TASK_SUCCESS':
            console.log('task deleted success');
            return state;
        case 'DELETE_TASK_ERROR':
            console.log('task delete ERROR!!!', action.err)
            return state;
        case 'TASK_OUTDATE_DELETED':
            console.log('task outdate deleted success');
            return state;
        case 'TASK_SORT_BY':
            return {
                ...state,
                sortBy: action.group
            };
        default:
            return state;
    }
}

export default taskReducer