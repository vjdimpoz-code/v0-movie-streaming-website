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

    const { uid } = await req.json()

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 })
    }

    await adminApp.auth().setCustomUserClaims(uid, { admin: true })

    return NextResponse.json({ message: "User is now admin!" }, { status: 200 })
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error }, { status: 500 })
  }
}
