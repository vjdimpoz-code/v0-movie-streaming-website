import { getAdminApp } from "@/utils/firebaseAdmin"

export async function checkIfUserIsAdmin(uid: string): Promise<boolean> {
  try {
    const admin = getAdminApp()
    const user = await admin.auth().getUser(uid)
    return user.customClaims?.admin === true
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

export async function getUserByEmail(email: string) {
  try {
    const admin = getAdminApp()
    return await admin.auth().getUserByEmail(email)
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function listAllUsers(maxResults = 100) {
  try {
    const admin = getAdminApp()
    const listUsersResult = await admin.auth().listUsers(maxResults)
    return listUsersResult.users
  } catch (error) {
    console.error("Error listing users:", error)
    return []
  }
}
