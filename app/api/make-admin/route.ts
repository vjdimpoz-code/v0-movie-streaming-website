import { type NextRequest, NextResponse } from "next/server"
import { getAdminApp } from "@/utils/firebaseAdmin"

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const expectedSecret = `Bearer ${process.env.ADMIN_SECRET}`

  if (authHeader !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const adminApp = getAdminApp()

    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await adminApp.auth().getUserByEmail(email)
    await adminApp.auth().setCustomUserClaims(user.uid, { admin: true })

    return NextResponse.json({ message: `${email} is now admin!`, uid: user.uid }, { status: 200 })
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error }, { status: 500 })
  }
}
