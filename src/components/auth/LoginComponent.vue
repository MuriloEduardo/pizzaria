<template>
    <div>
        <h1>Login</h1>
        <span>{{ error }}</span>
        <form @submit.prevent="onSubmit">
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
import EventBus from '../EventBus';

export default {
    data() {
        return {
            error: '',
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            const user = {
                email: this.email,
                password: this.password
            }

            AuthService.login(user).then(res => {
                if (res.status == 200) {
                    localStorage.setItem('usertoken', res.data);
                    this.$router.push({ name: 'home' });
                }
            });

            this.emitMethod();
        },
        emitMethod() {
            EventBus.$emit('logged-in', 'loggedin');
        }
    }
}
</script>
