import {create} from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token : null,
  isLoading : false,
  register: async (name, email, password, gender) => {
    set({ isLoading: true });
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, gender }),
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: data.user, token: data.token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
