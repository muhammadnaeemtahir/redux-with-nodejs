const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const produce = require('immer').produce


const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAEM_RESTOCKED = 'ICECREAEM_RESTOCKED'

function orderCake(qty = 1) {
    return {
        type: CAKE_ORDERED,
        payload: qty,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAEM_RESTOCKED,
        payload: qty,
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 20
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIcecreams: 10,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            // return {
            //     ...state,
            //     numOfCakes: state.numOfCakes - action.payload
            // }
            return produce(state, (draft) => {
                draft.numOfCakes -= action.payload
            })
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - action.payload
            }
        case ICECREAEM_RESTOCKED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload

            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger))
// console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => {})

// dispatch without binding
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake(2))
// store.dispatch(restockCake(4))

const actions = bindActionCreators({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake(3)
actions.restockCake(5)
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(2)

unsubscribe()