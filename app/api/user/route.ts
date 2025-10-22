import { NextResponse } from "next/server"
import dbcon from "@/app/lib/db"
import User from "@/app/model/user"

export const GET = async ()=>{
    await dbcon()
    const users = await User.find()
    return NextResponse.json(users)
}