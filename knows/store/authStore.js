import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
            console.log('Registration successful:', data);
           
            return {
                success : true,
                message : 'Registration successful',
                user : data.user,
                token : data.token
            }

        } else {
            console.error('Registration failed:', data.message);
            set({ isLoading: false });
        }
    } catch (error) {
     set({ isLoading: false });
     return {
         success: false,
         message: 'Error during registration',
         error
     };
    }
  },
}));

export default useAuthStore;
