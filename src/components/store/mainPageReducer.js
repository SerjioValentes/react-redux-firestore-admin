const SET_TITLE = `SET_TITLE`;
const SET_DESCRIPTION = `SET_DESCRIPTION`;
const SET_LIST = `SET_LIST`;


const defaultState = {
    title: '',
    description: '',
    list: [],
    isFetching: false,
}

export default function mainPageReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LIST:
            return{
                ...state,
                list: action.payload,
                isFetching: true,
            }
        case SET_TITLE:
            return{
                ...state,
                title: action.payload,
            }
        case SET_DESCRIPTION:
            return{
                ...state,
                description: action.payload,
            }
        default:
            return state
    }
}

export const setTitle = (title) => ({type: SET_TITLE, payload: title});
export const setDescription = (description) => ({type: SET_DESCRIPTION, payload: description});
export const setList = (listFromFireStore) => ({type: SET_LIST, payload: listFromFireStore});
