export default (initialState, eventDomain, swicthCb = ()=>{}) =>
    (state = initialState, action) => {
        let newState = swicthCb(state, action);
        if(newState) return newState;

        if (action.domain == eventDomain) return action.payload;
        return state;
    };