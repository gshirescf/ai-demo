import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const workerResponse = await fetch("https://*-ai-demo-app.gabby-is-the-best.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await workerResponse.json();

    // Log to understand the structure
    console.log("Worker response:", data);

    // Access the correct property based on actual structure
    // Assuming `data.response` is the correct path
    return NextResponse.json({
      answer: data.response || "No response available.",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error communicating with the AI service." },
      { status: 500 }
    );
  }
}
