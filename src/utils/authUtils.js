export function getAuthStatus() {
    return localStorage.getItem("isLoggedIn") === "true";
}

export const hasRole = (user, roleToCheck) => {
    if (!user?.role) return false; // Ensure roles exist

    const userRole = user.role?.toLowerCase(); // Extract role names

    return Array.isArray(roleToCheck)
        ? roleToCheck.some(role => userRole.includes(role.toLowerCase())) // Check if any role exists
        : userRole.includes(roleToCheck.toLowerCase()); // Check single role
};

