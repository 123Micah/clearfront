import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },
  actions: {
    async login(credentials) {
      const { data } = await api.post('/auth/login', credentials);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', this.token);
    },
    async register(payload) {
      const { data } = await api.post('/auth/register', payload);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', this.token);
    },
    async restoreUser() {
      if (!this.token || this.user) return;
      try {
        const { data } = await api.get('/auth/me');
        this.user = data;
      } catch {
        this.logout();
      }
    },
     setAuth(user, token) {
      this.user = user;
      this.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});
