<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'pizzas' }">Pizzas</router-link>
        </li>
      </ul>

      <ul v-if="auth != ''">
        <li>
          <router-link :to="{ name: 'profile' }">Profile</router-link>
        </li>
        <li>
          <button @click="logout">Logout</button>
        </li>
      </ul>

      <ul v-else>
        <li>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'register' }">Register</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import EventBus from './components/EventBus';

export default {
  data() {
    return {
      auth: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usertoken');
    }
  },
  mounted() {
    EventBus.$on('logged-in', status => {
      this.auth = status;
    });
  }
}
</script>
