import User from "@/model/user";
import dbcon from "@/lib/db";

export async function POST(req: Request) {
    try {
        await dbcon();
        const { name, email, age } = await req.json();
        const adduser = await User.insertOne({ name, email, age });
        return Response.json({ message: "User added succesfully", success: true, data: adduser }, { status: 200 })
    }
    catch (err) {
        return Response.json({ message: "error occured while adding user", success: false }, { status: 500 })
    }
}

export async function GET() {
    try {
        await dbcon();
        const users = await User.find();
        return Response.json({ message: "user data fetched successfully", data: users, success: true }, { status: 200 })
    }
    catch (err) {
        return Response.json({ message: "error while fetching data", err, success: false }, { status: 500 })
    }
}