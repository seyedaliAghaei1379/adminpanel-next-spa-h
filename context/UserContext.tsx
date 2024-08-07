import React, { createContext, useContext, useState, ReactNode } from 'react';

type Permission =
    | "users"
    | "user"
    | "create-user"
    | "edit-user"
    | "delete-user"
    | "assign-role"
    | "assign-category"
    | "user-category"
    | "user-categories"
    | "create-user-category"
    | "edit-user-category"
    | "delete-user-category"
    | "inventory"
    | "inventories"
    | "create-inventory"
    | "edit-inventory"
    | "delete-inventory"
    | "credit"
    | "credits"
    | "create-credit"
    | "edit-credit"
    | "delete-credit"
    | "";

// تعریف interface برای شیء نتیجه
interface UserCredentials {
    token: string;
    permissions: Permission[];
}

interface UserContextType {
    user: UserCredentials | null;
    setUser: (user: UserCredentials | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {


    const token = sessionStorage.getItem('token');
    // @ts-ignore
    const permissions = sessionStorage.getItem('permissions')?.split(',')

    // check and verify token
    // if token is invalid
    // router.push('auth/signin')
    // sesstionstorage.claer()

    // if verify token is true ....
    // @ts-ignore
    const [user, setUser] = useState<UserCredentials | null>({
        token : token  ?? "",
        permissions : permissions  ?? [""]
    });
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
