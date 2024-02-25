export const saveToken = (token) => {
    localStorage
        .setItem("token", token);
}

export const getToken = () => {
    return localStorage
        .getItem("token");
}

export const removeToken = () => {
    localStorage
        .removeItem("token");
}

export const saveRole = (role) => {
    localStorage
        .setItem("role", role);
}

export const getRole = () => {
    return localStorage
        .getItem("role");
}

export const removeRole = () => {
    localStorage
        .removeItem("role");
}

export const saveUser = (user) => {
    localStorage
        .setItem("user", JSON.stringify(user));
}

export const getUser = () => {
    return localStorage
        .getItem("user");
}

export const removeUser = () => {
    localStorage
        .removeItem("user");
}

export const closeSession = () => {
    removeToken();
    removeRole();
    removeUser();
}