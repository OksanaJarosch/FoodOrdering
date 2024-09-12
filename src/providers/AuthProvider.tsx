import { createContext, PropsWithChildren } from "react";

type AuthData = {};

const AuthContext = createContext<AuthData>({});

const AuthProvider = ({children}: PropsWithChildren) => {
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
)};

//for wrapping app
export default AuthProvider;