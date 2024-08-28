interface User {
    id: number;
    type: 'admin' | 'farmer';
}

export const useAuth = () => {
    const user = useState<User | null>('user', () => null)

    const login = async (userType: 'admin' | 'farmer') => {
        // In a real app, you'd call an API here
        user.value = {
            id: Math.floor(Math.random() * 1000), // Random ID for demo
            type: userType
        }
    }

    const logout = () => {
        user.value = null
    }

    return {
        user,
        login,
        logout,
        isAuthenticated: computed(() => !!user.value)
    }
}