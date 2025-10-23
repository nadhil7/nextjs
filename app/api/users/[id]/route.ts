import User from "@/model/user";
import dbcon from "@/lib/db";
import mongoose from "mongoose";
import { promises } from "dns";

export async function PUT(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const objid = new mongoose.Types.ObjectId(id)
        if (objid !== null && objid !== undefined) {
            await dbcon();
            const { name, email, age } = await req.json();
            const updateuser = await User.findByIdAndUpdate(objid, { name, email, age }, { new: true });
            return Response.json({ message: "successfully updated users", updateuser, success: true }, { status: 200 })
        }
        return Response.json({ message: "user id has some issues", success: false }, { status: 404 })

    }
    catch (err) {
        console.log(err)
        return Response.json({ message: "error while updating", err, success: false }, { status: 500 })
    }
}

export async function DELETE(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (id !== null && id !== undefined) {
            await dbcon();
            const deleteuser = await User.deleteOne({ _id: id })
            return Response.json({ message: "successfully deleted user", deleteuser, success: true }, { status: 200 })
        }
        return Response.json({ message: "user id has some issues", success: false }, { status: 404 })
    }
    catch (err) {
        return Response.json({ message: "error while deleting", err, success: false }, { status: 500 })
    }
}