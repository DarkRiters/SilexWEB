import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import type {User} from "../domain/user/User.ts";
import type {UserDTO} from "../domain/user/UserDTO.ts";
import {UserFactory} from "../domain/user/UserFactory.ts";
import {AuthService} from "../services/auth/AuthService.ts";

const STORAGE_KEY = 'silex.auth.user';
export const authStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null);
    const isLoggedIn = computed(() => currentUser.value !== null);

    function hydrateFromStorage() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        try {
            const dto = JSON.parse(raw) as UserDTO;
            const user = UserFactory.fromApi(dto);
            currentUser.value = user;
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function setUserFromDTO(dto: UserDTO) {
        const user = UserFactory.fromApi(dto);
        currentUser.value = user;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dto));
    }
    async function login(email: string, password: string): Promise<void> {
        const dto = await AuthService.login(email, password);
        setUserFromDTO(dto);
    }
    async function register(email: string, password: string): Promise<void> {
        const dto = await AuthService.register(email, password);
        setUserFromDTO(dto);
    }
    async function requestPasswordReset(email: string): Promise<void> {
        await AuthService.requestPasswordReset(email);
    }
    async function updateProfile(name: string, email: string): Promise<void> {
        const dto = await AuthService.updateProfile({name, email});
        setUserFromDTO(dto);
    }


    function logout() {
        currentUser.value = null;
        localStorage.removeItem(STORAGE_KEY);
    }
    hydrateFromStorage();
    return {
        currentUser,
        isLoggedIn,
        loginFromDTO: setUserFromDTO,
        login,
        register,
        requestPasswordReset,
        logout,
        updateProfile,
    };
});
