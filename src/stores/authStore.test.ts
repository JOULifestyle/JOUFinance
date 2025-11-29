import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from './authStore'

// Mock Firebase updateProfile
vi.mock('firebase/auth', () => ({
  updateProfile: vi.fn()
}))

describe('authStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      role: null
    })
    // Clear localStorage
    localStorage.clear()
  })

  it('should initialize with null user and role', () => {
    const { user, role } = useAuthStore.getState()
    expect(user).toBeNull()
    expect(role).toBeNull()
  })

  it('should set user correctly', () => {
    const { setUser } = useAuthStore.getState()
    const mockUser = { email: 'test@example.com', displayName: 'Test User' } as any

    setUser(mockUser, 'user')

    const { user, role } = useAuthStore.getState()
    expect(user).toEqual(mockUser)
    expect(role).toBe('user')
  })

  it('should update profile successfully for real Firebase user', async () => {
    const { setUser, updateProfile } = useAuthStore.getState()
    const mockUser = { email: 'test@example.com', displayName: 'Test User' } as any
    setUser(mockUser, 'user')

    await updateProfile({ displayName: 'Updated Name' })

    const { user } = useAuthStore.getState()
    expect(user?.displayName).toBe('Updated Name')
  })

  it('should update profile locally when Firebase update fails', async () => {
    // Mock Firebase updateProfile to throw error
    const { updateProfile: firebaseUpdateProfile } = await import('firebase/auth')
    vi.mocked(firebaseUpdateProfile).mockRejectedValueOnce(new Error('Firebase error'))

    const { setUser, updateProfile } = useAuthStore.getState()
    const mockUser = { email: 'test@example.com', displayName: 'Test User' } as any
    setUser(mockUser, 'user')

    // Should not throw, and update locally
    await expect(updateProfile({ displayName: 'Updated Name' })).resolves.toBeUndefined()

    const { user } = useAuthStore.getState()
    expect(user?.displayName).toBe('Updated Name')
  })

  it('should clear user on logout', () => {
    const { setUser, logout } = useAuthStore.getState()
    const mockUser = { email: 'test@example.com', displayName: 'Test User' } as any
    setUser(mockUser, 'user')

    logout()

    const { user, role } = useAuthStore.getState()
    expect(user).toBeNull()
    expect(role).toBeNull()
  })

  it('should clear mock user', () => {
    const { setUser, clearMockUser } = useAuthStore.getState()
    const mockUser = { email: 'test@example.com', displayName: 'Test User' } as any
    setUser(mockUser, 'user')

    clearMockUser()

    const { user, role } = useAuthStore.getState()
    expect(user).toBeNull()
    expect(role).toBeNull()
  })
})