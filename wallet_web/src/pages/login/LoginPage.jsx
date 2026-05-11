import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true)
            const { data: resp } = await axios.post("http://localhost:5000/login", {
                formData
            })
            console.log(resp)
            if (resp.success) {
                const userDetails = resp.user[0]
                const id = userDetails.id
                localStorage.setItem('user', JSON.stringify(userDetails))
                navigate(`/dept/${id}`)
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">

                {/* Title */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Digital Expense Wallet
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Sign in to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-600">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        {loading?".....":"Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;