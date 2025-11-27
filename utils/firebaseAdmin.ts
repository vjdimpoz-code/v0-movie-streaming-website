import admin from "firebase-admin"

let adminApp: admin.app.App | null = null

function getAdminApp() {
  if (adminApp) {
    return adminApp
  }

  if (!process.env.PRIVATE_KEY || !process.env.PROJECT_ID || !process.env.CLIENT_EMAIL) {
    throw new Error("Missing required Firebase Admin environment variables")
  }

  adminApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.CLIENT_EMAIL,
    }),
  })

  return adminApp
}

export { getAdminApp }
export default admin
