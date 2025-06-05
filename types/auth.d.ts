declare module '#auth-utils' {
    interface User {
        id: string;
        email: string;
        name?: string;
        avatar?: string;
        password?: string; // Optional, not returned in user session
        createdAt?: Date;
    }
}