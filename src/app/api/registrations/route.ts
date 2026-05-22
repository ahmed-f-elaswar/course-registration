import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT * FROM registrations ORDER BY created_at DESC")
      .all();

    const registrations = (rows as Record<string, unknown>[]).map((row) => ({
      ...row,
      courses: JSON.parse(row.courses as string),
    }));

    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      studentId,
      gender,
      yearOfStudy,
      department,
      courses,
      schedulePreference,
      additionalNotes,
      agreedToTerms,
    } = body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !studentId ||
      !gender ||
      !yearOfStudy ||
      !department ||
      !courses ||
      courses.length === 0 ||
      !schedulePreference ||
      !agreedToTerms
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const db = getDb();

    const stmt = db.prepare(`
      INSERT INTO registrations (full_name, email, phone, student_id, gender, year_of_study, department, courses, schedule_preference, additional_notes, agreed_to_terms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      fullName,
      email,
      phone,
      studentId,
      gender,
      yearOfStudy,
      department,
      JSON.stringify(courses),
      schedulePreference,
      additionalNotes || "",
      agreedToTerms ? 1 : 0
    );

    return NextResponse.json(
      { message: "Registration successful", id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}
