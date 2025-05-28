export const avatarPlaceholder = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'

export const truncate = (str, maxLen) => {
    return str.length > maxLen ? str.slice(0, maxLen) + "..." : str;
};