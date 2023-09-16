"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
	const [userType, setUserType] = useState("Donor");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
	async function submitHandler(e) {
		e.preventDefault();
		console.log(email);
		console.log(password);
		console.log(confirmPassword);
        if(password === confirmPassword){
            const response = await axios.post(
				`https://technovate-backend.onrender.com/${userType.toLowerCase()}/signup`,
				{
					email: email,
					password: password,
				}
			);
            console.log(response)
            if(response.status===201){
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                if(userType === "Hospital"){
                    router.push("/hospital")
                }
                else{
                    router.push("/onboarding");
                }
                localStorage.setItem("email", email);
				localStorage.setItem("password", password);
				localStorage.setItem("userType", userType.toLowerCase());
				localStorage.setItem("user_id", response.data.data._id);
            }
            else{
                alert(response.data.message)
            }
        }
        else{
            alert("Passwords do not match")
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
			<input
				type="password"
				value={confirmPassword}
				placeholder="Confirm Password"
				onChange={(e) => {
					setConfirmPassword(e.target.value);
				}}
				className="px-3 py-3 bg-slate-200 rounded-md border-2 w-72 focu"
			/>
			<button
				className="bg-blue-500 border-2 border-blue-500 px-5 py-2 text-white font-semibold rounded-sm hover:bg-white hover:text-blue-500 transition-all duration-200"
				onClick={submitHandler}
			>
				Sign up
			</button>
			<div>
				Have an account?{" "}
				<Link href={"/login"} className="text-blue-500 underline">
					Login
				</Link>{" "}
				here!
			</div>
		</div>
	);
}
