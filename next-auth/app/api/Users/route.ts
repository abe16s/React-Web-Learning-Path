import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const duplicate =  await User.findOne({ email }).lean().exec();
        if (duplicate) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const user = await User.create({ name, email, password: await hash(password, 10) });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}