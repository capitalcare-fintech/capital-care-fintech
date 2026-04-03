import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function ensureTable() {
  const db = getDB();

  // Create table without profile_image so existing DBs aren't affected
  await db.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      phone         VARCHAR(15)  NOT NULL UNIQUE,
      name          VARCHAR(255) NOT NULL DEFAULT '',
      email         VARCHAR(255) NOT NULL DEFAULT '',
      relationship_manager VARCHAR(255) NOT NULL DEFAULT '',
      address_line1 VARCHAR(255) NOT NULL DEFAULT '',
      address_line2 VARCHAR(255) NOT NULL DEFAULT '',
      address_line3 VARCHAR(255) NOT NULL DEFAULT '',
      locality      VARCHAR(255) NOT NULL DEFAULT '',
      landmark      VARCHAR(255) NOT NULL DEFAULT '',
      city          VARCHAR(255) NOT NULL DEFAULT '',
      state         VARCHAR(255) NOT NULL DEFAULT '',
      pincode       VARCHAR(10)  NOT NULL DEFAULT '',
      created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Safely add profile_image if it doesn't exist yet (handles existing tables)
  const [cols] = await db.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'profiles' AND COLUMN_NAME = 'profile_image'`,
  ) as [Array<{ COLUMN_NAME: string }>, unknown];

  if (cols.length === 0) {
    await db.query(
      `ALTER TABLE profiles ADD COLUMN profile_image VARCHAR(512) NOT NULL DEFAULT ''`,
    );
  }
}

// GET /api/profile?phone=XXXXXXXXXX
export async function GET(req: NextRequest) {
  try {
    const phone = req.nextUrl.searchParams.get("phone")?.trim();
    if (!phone) {
      return NextResponse.json({ error: "phone query param required" }, { status: 400 });
    }

    await ensureTable();
    const db = getDB();
    const [rows] = (await db.query("SELECT * FROM profiles WHERE phone = ? LIMIT 1", [phone])) as [
      Array<Record<string, unknown>>,
      unknown,
    ];

    if (rows.length === 0) {
      return NextResponse.json({ profile: null });
    }

    const r = rows[0];
    return NextResponse.json({
      profile: {
        name: r.name,
        phone: r.phone,
        email: r.email,
        relationshipManager: r.relationship_manager,
        profileImage: r.profile_image ?? "",
        address: {
          line1: r.address_line1,
          line2: r.address_line2,
          line3: r.address_line3,
          locality: r.locality,
          landmark: r.landmark,
          city: r.city,
          state: r.state,
          pincode: r.pincode,
        },
      },
    });
  } catch (err) {
    console.error("[GET /api/profile]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/profile  — upsert
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, relationshipManager, address = {} } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone || !/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json({ error: "Phone must be 10 digits" }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (address.pincode && !/^\d+$/.test(address.pincode.trim())) {
      return NextResponse.json({ error: "Pincode must be numeric" }, { status: 400 });
    }

    await ensureTable();
    const db = getDB();

    await db.query(
      `INSERT INTO profiles
        (phone, name, email, relationship_manager,
         address_line1, address_line2, address_line3,
         locality, landmark, city, state, pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name                 = VALUES(name),
         email                = VALUES(email),
         relationship_manager = VALUES(relationship_manager),
         address_line1        = VALUES(address_line1),
         address_line2        = VALUES(address_line2),
         address_line3        = VALUES(address_line3),
         locality             = VALUES(locality),
         landmark             = VALUES(landmark),
         city                 = VALUES(city),
         state                = VALUES(state),
         pincode              = VALUES(pincode),
         updated_at           = CURRENT_TIMESTAMP`,
      [
        phone.trim(),
        name.trim(),
        (email ?? "").trim(),
        (relationshipManager ?? "").trim(),
        (address.line1 ?? "").trim(),
        (address.line2 ?? "").trim(),
        (address.line3 ?? "").trim(),
        (address.locality ?? "").trim(),
        (address.landmark ?? "").trim(),
        (address.city ?? "").trim(),
        (address.state ?? "").trim(),
        (address.pincode ?? "").trim(),
      ],
    );

    return NextResponse.json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error("[POST /api/profile]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
