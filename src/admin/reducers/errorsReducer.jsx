export const ErrorsDomain = 'errors';

export default function errorsReducer(state = [], action) {
    if(action.domain !== ErrorsDomain) return state;

    if (typeof action.run === "function") {
        return action.run(state);
    }
}