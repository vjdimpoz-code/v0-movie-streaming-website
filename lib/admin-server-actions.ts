"use server"

export async function setUserAsAdmin(email?: string, uid?: string) {
  const adminSecret = process.env.ADMIN_SECRET
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  if (!adminSecret) {
    throw new Error("ADMIN_SECRET is not configured")
  }

  try {
    const response = await fetch(`${baseUrl}/api/make-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSecret}`,
      },
      body: JSON.stringify({
        email,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to set admin privileges")
    }

    return { success: true, message: data.message }
  } catch (error) {
    throw error instanceof Error ? new Error(error.message) : new Error("An error occurred")
  }
}
