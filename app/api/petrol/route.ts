import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const fuel = searchParams.get("fuel") || "E10"
  const radius = searchParams.get("radius") || "5"

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat/lng parameters" }, { status: 400 })
  }

  try {
    // Try the UK fuel price API
    const apiUrl = `https://checkfuelprices.co.uk/api/widget/stations?lat=${lat}&lng=${lng}&fuel=${fuel}&radius=${radius}`

    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "CheapestNearMe/1.0",
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[Petrol API]", error instanceof Error ? error.message : "Unknown error")

    // Return empty stations array so client knows to use fallback
    return NextResponse.json({
      stations: [],
      error: "Unable to fetch live prices",
      fallback: true
    })
  }
}
