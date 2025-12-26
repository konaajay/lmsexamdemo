// This service handles all authentication-related API calls.
// Currently, it uses mock data (simulating a backend).
// Later, you can replace the mock logic with real API calls using fetch or axios.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
    // Mock Login Function
    login: async (credentials) => {
        // Simulate network delay
        await delay(1000);

        // Simulate validation logic (Replace with real API call later)
        if (credentials.email === "test@example.com" && credentials.password === "password") {
            return {
                success: true,
                data: {
                    token: "mock-jwt-token-12345",
                    user: {
                        id: 1,
                        email: credentials.email,
                        role: "student",
                        fullName: "Test Student"
                    }
                }
            };
        } else {
            // Simulate error response
            throw new Error("Invalid email or password");
        }
    },

    // Mock Signup Function
    signup: async (userData) => {
        // Simulate network delay
        await delay(1000);

        // Simulate success (Replace with real API call later)
        return {
            success: true,
            data: {
                message: "User registered successfully",
                user: { ...userData, id: Math.floor(Math.random() * 1000) }
            }
        };
    }
};
