"use client"

import { useRouter } from "next/navigation"
import React, {useState} from "react"

const UserForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        const response = await fetch("/api/Users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            router.refresh()
            router.push("/")
        } else {
            const data = await response.json()
            setErrorMessage(data.message)
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
            <h1>Create New User</h1>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} required
            className="m-2 bg-slate-400 rounded"/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={handleChange} value={formData.email} required
            className="m-2 bg-slate-400 rounded"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} required
            className="m-2 bg-slate-400 rounded"/>
            <button type="submit" className="bg-blue-300 hover:bg-blue-100">Create User</button>
        </form>
        <p className="text-red-500">{errorMessage}</p>
    </>
  )
}

export default UserForm