import { getAdminApp } from "@/utils/firebaseAdmin"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email, uid } = await req.json()
    const adminSecret = req.headers.get("Authorization")?.split("Bearer ")[1]

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const admin = getAdminApp()
    let userUid = uid

    // If email is provided, get the UID first
    if (email && !uid) {
      const user = await admin.auth().getUserByEmail(email)
      userUid = user.uid
    }

    if (!userUid) {
      return NextResponse.json({ error: "User UID or email required" }, { status: 400 })
    }

    // Remove admin claims
    await admin.auth().setCustomUserClaims(userUid, { admin: false })

    return NextResponse.json({ message: `Admin privileges removed from ${email || userUid}`, success: true })
  } catch (error) {
    console.error("Remove admin error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to remove admin" },
      { status: 500 },
    )
  }
}
