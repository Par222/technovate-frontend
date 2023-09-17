"use client";
import NavBar from "@/components/Navbar";
import DropFileUpload from "@/components/DropFileUpload";
import { storage } from "@/firebase/firebase";
import {
	getDownloadURL,
	ref,
	deleteObject,
	uploadBytes,
	getMetadata,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
const Onboarding = () => {
	const blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

	const upload = (accepted, rejected) => {
		setReport([...accepted]);
	};
	const router = useRouter();

	const upload1 = (accepted, rejected) => {
		setAdhar([...accepted]);
	};
	const [name, setName] = useState("");
	const [age, setAge] = useState(19);
	const [gender, setGender] = useState("");
	const [blood, setBlood] = useState("A+");
	const [report, setReport] = useState(null);
  const [bloodReportUrl, setBloodReportUrl] = useState("")
	const [adhar, setAdhar] = useState(null);
  const [idUrl, setIdUrl] = useState("")
	const [des, setDes] = useState("");

	const getImageURL = async (pdf) => {
		try {
			const pdfRef = ref(storage, `blood_report/${pdf.name}`);
			const imageUploadResponse = await uploadBytes(pdfRef, pdf);
			const imageDownloadResponse = await getDownloadURL(pdfRef);
			console.log(imageDownloadResponse);
			return imageDownloadResponse;
		} catch (error) {
			console.log(error, "Err");
		}
	};
	const getAdharUrl = async (pdf) => {
		try {
			const pdfRef = ref(storage, `aadhar/${pdf.name}`);
			const imageUploadResponse = await uploadBytes(pdfRef, pdf);
			const imageDownloadResponse = await getDownloadURL(pdfRef);
			console.log(imageDownloadResponse);
			return imageDownloadResponse;
		} catch (error) {
			console.log(error, "Err");
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const email = localStorage.getItem("email");
		const password = localStorage.getItem("password");
		const userType = localStorage.getItem("userType");
		const user_id = localStorage.getItem("user_id");
    let data = {}
    if(userType==='recipient'){
      data = {
        _id: user_id,
			fullname: name,
			age: age,
			gender: gender,
			blood_group: blood,
			blood_report: bloodReportUrl,
			aadhar_url: idUrl,
			medical_history: des,
		};
    }
    else{
     data = {
      _id: user_id,
		fullname: name,
		age: age,
		gender: gender,
		blood_group: blood,
		blood_report: bloodReportUrl,
		aadhar_url: idUrl,
		medical_history: des,
    organ: ""
	};
    }
		const response = await axios.post(
			`https://technovate-backend.onrender.com/${userType}/onboarding`, data
			
		);
    try {
      localStorage.setItem("name", name)
      localStorage.setItem("age", age)
      localStorage.setItem("blood_group", blood)
      localStorage.setItem("gender", gender)
      if(userType==='recipient'){
        router.push("/profile");
      }
      else{
        try {
          const response2 = await axios.post(
			"https://technovate-backend.onrender.com/hospital/request", {
        donor_id: data._id
      })
      console.log(response2)
        } catch (error) {
          console.log(error)
        }

		;
        router.push("/donor")
      }
    } catch (error) {
      console.log(error)
    }
	};
	useEffect(() => {
		if (adhar) {
			getAdharUrl(adhar[adhar.length - 1]).then((url) => {
        setIdUrl(url)
      });;
		}
	}, [adhar]);
	useEffect(() => {
		if (report) {
			getImageURL(report[report.length - 1]).then((url) => {
        setBloodReportUrl(url)
      });
			localStorage.setItem(
				"pdf",
				URL.createObjectURL(report[report.length - 1])
			);
		}
	}, [report]);
	return (
		<>
			<NavBar></NavBar>
			<div className="mx-10 my-4">
				<h1 className="text-blue-500 text-2xl font-extrabold mb-2">
					Welcome to Onboarding
				</h1>
				<p className="text-base font-medium">
					As a first step lets create your profile
				</p>
				<form className="flex  my-4 text-sm" onSubmit={submitHandler}>
					<div className="flex flex-col w-[30%]">
						<label className="my-1 text-sm">Patient Name</label>
						<input
							className="focus:outline-none border-b-2 border-blue-600 mb-2 py-1"
							placeholder="Type your name here"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						></input>
						<label className="my-1 text-sm">Age</label>
						<input
							className="focus:outline-none border-b-2 border-blue-600 mb-2 py-1"
							type="number"
							placeholder="Type your age"
							value={age}
							onChange={(e) => setAge(e.target.value)}
							min={19}
						></input>
						<label className="my-1 text-sm">Gender</label>
						<input
							className="focus:outline-none border-b-2 border-blue-600 mb-2 py-1"
							placeholder="Type your gender"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
						></input>
						<label className="my-1 text-sm">Blood Group</label>
						<select
							className="focus:outline-none border-b-2 border-blue-600 mb-2 py-1"
							placeholder="Enter blood group"
							value={blood}
							onChange={(e) => setBlood(e.target.value)}
						>
							{blood_groups.map((b) => (
								<option value={b}>{b}</option>
							))}
						</select>
						<label className="my-1 text-sm">
							Medical Condition
						</label>
						<textarea
							className=" mb-2 py-1 border-2 border-black  px-2"
							placeholder="Enter important medical condition"
							rows={5}
							value={des}
							onChange={(e) => setDes(e.target.value)}
						></textarea>
					</div>
					<div className="w-[50%] mx-10">
						<label className="my-2">Blood Report</label>
						<DropFileUpload
							msg="Drag or browse to"
							extension="upload your Blood Report"
							uploadFiles={upload}
						></DropFileUpload>
						{report && (
							<div className="flex items-cente my-2r">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1.5em"
									viewBox="0 0 384 512"
								>
									<path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
								</svg>
								<p className="mx-3">File uploaded</p>
							</div>
						)}
						<label className="mt-3">Identification</label>
						<DropFileUpload
							msg="Drag or browse to"
							extension="upload your Aadhar Card"
							uploadFiles={upload1}
						></DropFileUpload>
						{adhar && (
							<div className="flex items-cente my-2r">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="1.5em"
									viewBox="0 0 384 512"
								>
									<path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
								</svg>
								<p className="mx-3">File uploaded</p>
							</div>
						)}
						<button className="my-4 px-6 py-2 bg-blue-600 border-2 border-blue-500 text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 transition-all duration-200">
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
export default Onboarding;
