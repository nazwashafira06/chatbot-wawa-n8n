export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

    if (!webhookUrl) {
      return Response.json({ error: "Webhook URL not configured" }, { status: 500 })
    }

    console.log("[v0] Proxying request to:", webhookUrl)

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
    })

    console.log("[v0] N8N Response status:", response.status)

    if (!response.ok) {
      throw new Error(`N8N API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] N8N Response data:", data)

    return Response.json(data)
  } catch (error) {
    console.error("[v0] API route error:", error)
    return Response.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 })
  }
}
