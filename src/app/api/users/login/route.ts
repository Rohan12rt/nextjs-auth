import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not exist' }, { status: 400 });
        }
        console.log('user exist');

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "check your credentials" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const secret = process.env.TOKEN_SECRET!;

        const token = await jwt.sign(tokenData ,secret, {expiresIn: '1d'}) ;

       const response =  NextResponse.json({
            messages:"Logged In Successfully",
            success:true
        }) ;

        response.cookies.set("token", token, {
           httpOnly: true
        })

        return response ;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}