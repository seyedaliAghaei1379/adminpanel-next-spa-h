import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    const [user, setUser] = useState<UserCredentials | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const permissions = sessionStorage.getItem('permissions');
        if (token && permissions) {
            setUser({
                token: token,
                permissions: permissions.split(',') as Permission[],
            });
        } else {
            // در صورت نیاز می‌توانید به صفحه ورود کاربر هدایت کنید
            // router.push('auth/signin')
            // sessionStorage.clear()
        }
        setLoading(false);
    }, []);

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
