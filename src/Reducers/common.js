export default (state = {
    test: null
}, action) => {
    switch (action.type) {
        case 'PREVIOUS_USER':
            return {
                ...state,
                previousUser: true
            }
    }

    return state;
};
