export const USER_STRINGS = {
    USER_FOUND: 'User found',
    USERS_FOUND: 'Users found',
    USER_FOUND_ID: (id: string) => `User with id ${id} found`,
    NO_USERS_FOUND: 'No users found',
    NO_USER_ID_FOUND: (id: string) => `No user with id ${id} found`,
    USER_DELETED: 'User deleted',
    USER_DELTED_ID: (id: string) => `User with id ${id} deleted`,
    USER_DELTED_ERROR_ID: (id: string) => `Error deleting user with id ${id}`,
    USER_CREATED: 'User created',
    USER_CREATED_ERROR: 'Error creating user',
    USER_UPDATED: 'User updated',
    USER_UPDATED_ERROR: 'Error updating user',
    USER_EMAIL_EXISTS: 'Email already exists',
    USER_EMAIL_NOT_EXISTS: ((email: string) => `Email ${email} does not exist`),
    USER_EMAIL_FOUND: (email: string) => `User with email ${email} found`,
}

export const AUTH_STRINGS = {
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    INVALID_ACCESS_TOKEN: 'Invalid access token',
}