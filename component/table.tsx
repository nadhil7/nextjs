"use client";
import { instance } from "@/lib/axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

function Table() {
    interface Res {
        message: string;
        data: any;
        success: boolean;
    }

    interface User {
        _id?: string;
        name: string;
        email: string;
        age: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const [useredit, showuseredit] = useState(false);
    const [form, setForm] = useState<User>({ name: "", email: "", age: "" });
    useEffect(() => {
        fetchusers();
    }, []);

    const fetchusers = async () => {
        try {
            const response: Res = await instance.get("/users/");
            console.log(response.data);
            setUsers(response.data.data);
        } catch (err) {
            console.log("error occured while fetching users", err);
        }
    };

    const handleEditUser = (user: User) => {
        showuseredit(true);
        setForm({
            name: user.name,
            email: user.email,
            age: user.age,
            _id: user._id
        });
    };

    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form._id) return;

        try {
            await instance.put(`/users/${form._id}`, form);
            setForm({ name: "", email: "", age: "" });
            fetchusers();
            showuseredit(false);
        } catch (err) {
            console.log("Error updating user", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const deleteuser = async (id: string) => {
        try {
            await instance.delete(`/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            console.log("error occured while deleting users", err);
        }
    };
    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await instance.post("/users/", form);
            setForm({ name: "", email: "", age: "" });
            fetchusers();
            showuseredit(false);
        } catch (err) {
            console.log("error occured while adding users", err);
        }
    }

    return (
        <div className="px-6 md:px-20 py-8">
            <div className="flex justify-end items-center mb-6 ">
                <button onClick={() => showuseredit(true)} className="bg-green-500 p-4 rounded-2xl text-black">Add user+</button>
            </div>
            {useredit && <div className="mb-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-neutral-200">
                    Add New User
                </h2>
                <form className="flex flex-col md:flex-row gap-4" onSubmit={form._id ? handleUpdateUser : handleAddUser}>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 flex-1 dark:bg-neutral-900 dark:text-neutral-100"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 flex-1 dark:bg-neutral-900 dark:text-neutral-100"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 w-24 dark:bg-neutral-900 dark:text-neutral-100"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => {showuseredit(false); setForm({ name: "", email: "", age: "" });}}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Cancel
                    </button>
                </form>
            </div>}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-neutral-400">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-neutral-400">
                                        Age
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-neutral-400">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase dark:text-neutral-400">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700">
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">
                                                {user.age}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteuser(String(user._id))}
                                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-4 text-center text-sm text-gray-500 dark:text-neutral-400"
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
