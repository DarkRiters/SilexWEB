import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import type {User} from "../domain/user/User.ts";
import type {UserDTO} from "../domain/user/UserDTO.ts";
import {UserFactory} from "../domain/user/UserFactory.ts";
import {AuthService} from "../services/auth/AuthService.ts";

export const authStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null);
    const isLoggedIn = computed(() => currentUser.value !== null);


    function setUserFromDTO(dto: UserDTO) {
        const user = UserFactory.fromApi(dto);
        currentUser.value = user;
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

    function logout() {
        currentUser.value = null;
    }

    return {
        currentUser,
        isLoggedIn,
        loginFromDTO: setUserFromDTO,
        login,
        register,
        requestPasswordReset,
        logout,
    };
});
