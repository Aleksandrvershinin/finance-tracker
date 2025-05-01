"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtSecret = void 0;
const getJwtSecret = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    return process.env.JWT_SECRET;
};
exports.getJwtSecret = getJwtSecret;
//# sourceMappingURL=jwt.config.js.map