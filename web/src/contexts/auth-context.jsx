import createGlobalState from "react-create-global-state";


const stateStorage = localStorage.getItem("@PithanAnimeSocialMidia:authToken");
const initialState = stateStorage ? stateStorage : null;

const [_useAuthToken, Provider] = createGlobalState(initialState);

export function useAuthProvider() {
    const [_token, _setToken] = _useAuthToken();

    function setToken(token) {
      _setToken(token);
      localStorage.setItem("@PithanAnimeSocialMidia:authToken", token);
    }

    return {
      _token, setToken
    }
}

export const AuthProvider = Provider;