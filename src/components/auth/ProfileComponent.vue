<template>
    <div>
        <h1>Profile</h1>
        <ul v-if="user">
            <li>{{ user._id }}</li>
            <li>{{ user.name }}</li>
            <li>{{ user.email }}</li>
        </ul>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
    data() {
        const token = localStorage.getItem('usertoken');
        return {
            user: token ? jwt_decode(token) : ''
        }
    }
}
</script>
