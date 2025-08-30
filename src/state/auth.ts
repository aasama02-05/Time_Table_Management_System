import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '@/lib/auth';
import { UserRole } from '@/types/domain';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, role?: UserRole) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock authentication logic
          const mockUsers: AuthUser[] = [
            {
              id: '1',
              name: 'Dr. Sarah Johnson',
              email: 'admin@university.edu',
              role: 'admin',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
              isActive: true,
              token: 'mock-jwt-token-admin',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '2',
              name: 'Prof. Michael Chen',
              email: 'teacher@university.edu',
              role: 'teacher',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              isActive: true,
              token: 'mock-jwt-token-teacher',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '3',
              name: 'Alex Rivera',
              email: 'student@university.edu',
              role: 'student',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              isActive: true,
              token: 'mock-jwt-token-student',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '4',
              name: 'Maria Garcia',
              email: 'staff@university.edu',
              role: 'support_staff',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
              isActive: true,
              token: 'mock-jwt-token-staff',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ];

          let user = mockUsers.find(u => u.email === email);
          
          // If role is specified and user found, update their role (for demo purposes)
          if (user && role && user.role !== role) {
            user = { ...user, role };
          }
          
          if (!user) {
            throw new Error('Invalid email or password');
          }

          if (password !== 'password123') {
            throw new Error('Invalid email or password');
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      },

      updateProfile: (updates: Partial<AuthUser>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates, updatedAt: new Date().toISOString() }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);