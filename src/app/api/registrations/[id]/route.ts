import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const result = db
      .prepare("DELETE FROM registrations WHERE id = ?")
      .run(Number(id));

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Registration deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}
