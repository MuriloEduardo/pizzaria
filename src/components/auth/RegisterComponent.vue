<template>
    <div>
        <h1>Register</h1>
        <span>{{ error }}</span>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="name">Name</label>
                <input type="text" v-model="name" id="name">
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" v-model="email" id="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" id="password">
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import AuthService from './AuthService';

export default {
    data() {
        return {
            error: '',
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            const newUser = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            AuthService.register(newUser).then(res => {
                if (res.status == 200) {
                    if (!res.data.error) {
                        this.$router.push({ name: 'login' });
                    } else {
                        this.error = res.data.error;
                    }
                }
            });
        }
    }
}
</script>

