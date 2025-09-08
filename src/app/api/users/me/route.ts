import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    // Extract user ID from token
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid or missing token" },
        { status: 401 }
      );
    }

    // Find user and exclude password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "No user found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user:", error.message);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
