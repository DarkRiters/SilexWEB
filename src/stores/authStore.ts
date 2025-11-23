import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import type {User} from "../domain/user/User.ts";
import type {UserDTO} from "../domain/user/UserDTO.ts";
import {UserFactory} from "../domain/user/UserFactory.ts";

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null);
    const isLoggedIn = computed(() => currentUser.value !== null);


    function loginFromDTO(dto: UserDTO) {
        const user = UserFactory.fromApi(dto);
        currentUser.value = user;
    }

    function logout() {
        currentUser.value = null;
    }

    return {
        currentUser,
        isLoggedIn,
        loginFromDTO,
        logout,
    };
});
