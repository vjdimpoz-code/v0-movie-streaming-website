"use server"

export async function makeUserAdminAction(email: string) {
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret) {
    throw new Error("ADMIN_SECRET is not configured")
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/make-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSecret}`,
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to set admin")
    }

    return await response.json()
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error"
    throw new Error(error)
  }
}

export async function makeUserAdminByUidAction(uid: string) {
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret) {
    throw new Error("ADMIN_SECRET is not configured")
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/set-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSecret}`,
      },
      body: JSON.stringify({ uid }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to set admin")
    }

    return await response.json()
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error"
    throw new Error(error)
  }
}
