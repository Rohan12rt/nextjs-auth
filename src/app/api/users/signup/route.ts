import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      console.log('Error:--  ' + 'user already exist');
      return NextResponse.json({ error: 'user already exist' }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser);

    //   send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: 'user register successfully',
      success: true,
      savedUser
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}