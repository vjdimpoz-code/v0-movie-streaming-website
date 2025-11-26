// Admin authentication utility
// Only vjdimpoz@gmail.com has admin access

const ADMIN_EMAIL = "vjdimpoz@gmail.com"

export const isAdminUser = (email: string): boolean => {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}

export const ADMIN_CREDENTIALS = {
  email: ADMIN_EMAIL,
}

export const getAdminToken = (): string | null => {
  // In a real app, this would come from Firebase
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken")
  }
  return null
}

export const setAdminToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminToken", token)
  }
}

export const clearAdminToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken")
  }
}
