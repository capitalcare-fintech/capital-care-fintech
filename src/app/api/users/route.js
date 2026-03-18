import { getDB } from "@/lib/db";

// GET /api/users — fetch all users
export async function GET() {
  try {
    const db = getDB();
    const [rows] = await db.query(
      "SELECT id, fullName, phone, created_at FROM users"
    );
    return Response.json(rows);
  } catch (error) {
    console.error("[GET /api/users]", error);
    return Response.json({ error: "Error fetching users" }, { status: 500 });
  }
}

// POST /api/users — insert a user (raw, no bcrypt — use /api/signup for hashed)
export async function POST(req) {
  try {
    const { fullName, phone, password } = await req.json();

    if (!fullName || !phone || !password) {
      return Response.json(
        { error: "fullName, phone, and password are required" },
        { status: 400 }
      );
    }

    const db = getDB();
    await db.query(
      "INSERT INTO users (fullName, phone, password) VALUES (?, ?, ?)",
      [fullName, phone, password]
    );

    return Response.json({ message: "User added successfully" }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/users]", error);
    return Response.json({ error: "Error inserting user" }, { status: 500 });
  }
}
