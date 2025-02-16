export const getJwtSecret = (): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.')
    }
    return process.env.JWT_SECRET
}
