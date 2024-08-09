
interface responseUserCategory {
    id: number;
    name: string;
    created_at: string; // ISO string for datetime
    updated_at: string; // ISO string for datetime
    users: any[]; // Adjust this type based on the structure of the `users` array
}
