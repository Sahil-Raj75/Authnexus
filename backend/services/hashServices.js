import bcrypt from "bcryptjs";

// Hash password
export const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, 10);
};

// Compare password
export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};