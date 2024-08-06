import React, { createContext, useState, ReactNode, useContext } from 'react';


// تعریف نوع برای Permissions
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
    | "delete-credit";

// تعریف interface برای شیء نتیجه
interface UserCredentials {
    token: string;
    permissions: Permission[];
}



// مقدار پیش‌فرض برای Context
const UserContext = createContext<UserCredentials | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


// Hook برای استفاده از Context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
