"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Login(){
    const [userType, setUserType] = useState("Donor")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    async function submitHandler(e){
        e.preventDefault();
        console.log(email)
        console.log(password)
        const response = await axios.post(
			`https://technovate-backend.onrender.com/${userType.toLowerCase()}/login`,
			{
				email: email,
				password: password,
			}
		);
        console.log(response)
        if(response.status===200){
            router.push(`/${userType.toLowerCase()}`)
        }
    }
    return (
		<div className="flex flex-col justify-center items-center w-full min-h-screen space-y-5">
			<div id="title" className="text-blue-500 text-5xl font-bold">
				OrganConnect
			</div>
			<div className="rounded-full flex flex-row ">
				<div
					className={`px-3 py-2 rounded-l-full border-y-2 pl-5 font-semibold cursor-pointer transition-all duration-100 ${
						userType === "Donor"
							? "bg-blue-500 text-white "
							: "text-blue-500"
					} `}
					onClick={() => {
						setUserType("Donor");
					}}
				>
					Donor
				</div>
				<div
					className={`px-3 py-2 border-y-2 border-x-2 font-semibold cursor-pointer transition-all duration-100 ${
						userType === "Recipient"
							? "bg-blue-500 text-white"
							: "text-blue-500"
					} `}
					onClick={() => {
						setUserType("Recipient");
					}}
				>
					Recipient
				</div>
				<div
					className={`px-3 py-2 border-y-2 pl-5 rounded-r-full pr-5 font-semibold cursor-pointer transition-all duration-100 ${
						userType === "Hospital"
							? "bg-blue-500 text-white "
							: "text-blue-500"
					} `}
					onClick={() => {
						setUserType("Hospital");
					}}
				>
					Hospital
				</div>
			</div>
			<input
				type="email"
				value={email}
				placeholder="Email-ID"
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				className="px-3 py-3 bg-slate-200 rounded-md border-2 w-72"
			/>
			<input
				type="password"
				value={password}
				placeholder="Password"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				className="px-3 py-3 bg-slate-200 rounded-md border-2 w-72 focu"
			/>
			<button
				className="bg-blue-500 border-2 border-blue-500 px-5 py-2 text-white font-semibold rounded-sm hover:bg-white hover:text-blue-500 transition-all duration-200"
				onClick={submitHandler}
			>
				Login
			</button>
            <div>Don't have an account? <Link href={'/signup'} className="text-blue-500 underline">Sign up</Link> here!</div>
		</div>
	);
}