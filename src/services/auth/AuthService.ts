import type {UserDTO} from "../../domain/user/UserDTO.ts";
import {api} from "../http/api.ts";

const USE_FAKE_API = true;

const fakeUser: UserDTO = {
    id: 1,
    name: "Test User",
    email: "user@gmail.com",
    role: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export class AuthService {
    static async login(email: string, password: string): Promise<UserDTO> {
        if (USE_FAKE_API) {
            await new Promise(r => setTimeout(r, 300));

            if (email === "user@gmail.com" && password === "Password123") {
                return fakeUser;
            }

            throw new Error("INVALID_CREDENTIALS");
        }

        const res = await api.post('/login', {email, password});
        return res.data.user as UserDTO;
    }

    static async register(email: string, password: string): Promise<UserDTO> {
        if (USE_FAKE_API) {
            await new Promise(r => setTimeout(r, 300));

            if (email === "user@gmail.com") {
                throw new Error("EMAIL_ALREADY_TAKEN");
            }

            return {
                ...fakeUser,
                id: 2,
                name: "New User",
                email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
        }

        const res = await api.post('/register', {email, password});
        return res.data.user as UserDTO;
    }

    static async requestPasswordReset(email: string): Promise<void> {
        if (USE_FAKE_API) {
            await new Promise(r => setTimeout(r, 300));

            if (email !== "user@gmail.com") throw new Error("EMAIL_NOT_FOUND");

            return;
        }

        await api.post('/forgot-password', {email});
    }
    static async updateProfile(payload: { name: string; email: string }): Promise<UserDTO> {
        if (USE_FAKE_API) {
            await new Promise(r => setTimeout(r, 300));

            return {
                ...fakeUser,
                name: payload.name,
                email: payload.email,
                updated_at: new Date().toISOString(),
            };
        }

        const res = await api.put('/me', payload);
        return res.data.user as UserDTO;
    }
}
