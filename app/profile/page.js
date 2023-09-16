"use client";
import GenericModal from "@/components/GenericModal";
import { useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import axios from "axios";
import { donors } from "@/components/donor";
import { Niconne } from "next/font/google";
const { default: NavBar } = require("@/components/NavBar");

import { Doughnut } from "react-chartjs-2";
import {
	CategoryScale,
	Chart,
	LinearScale,
	Tooltip,
	Legend,
	BarElement,
	Title,
	ArcElement,
} from "chart.js";
const Profile = () => {
	Chart.register(
		CategoryScale,
		LinearScale,
		Title,
		Tooltip,
		BarElement,
		Legend,
		ArcElement
	);
	const data = {
		labels: ["RH levels", "HLA levels", "Blood Group"],
		datasets: [
			{
				label: "Comptablity",
				data: [80, 60, 70],
				backgroundColor: ["#BF55EC", "#BE90D4", "#5B3256"],
				hoverOffset: 4,
			},
		],
	};
	const [modal, setModal] = useState(false);
	const [summary, setSumamry] = useState("");
	const fetchSummary = async () => {
		const formData = new FormData();
		const response = await axios.post(
			"http://localhost:5000/summarize",
			formData
		);
		setSumamry(response.data);
	};
	const [donor, setDonor] = useState(null);
	const [details, setDetails] = useState(false);
	const [allDonors, setAllDonors] = useState();
	async function connectWaitList(donorId) {
		try {
			const response = await axios.patch(
				"https://technovate-backend.onrender.com/recipient/request",
				{
					donor_id: donorId._id,
					recipient_id: localStorage.getItem("user_id"),
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}
	async function getDonors() {
		try {
			const response = await axios.get(
				"https://technovate-backend.onrender.com/donor/donors"
			);
			console.log(response);
			setAllDonors(response.data.data);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getDonors();
	}, []);
	return (
		<>
			<NavBar></NavBar>
			<div className="flex">
				<div className="mx-5 my-10 w-[30%]">
					<p className="text-2xl font-extrabold">
						Welcome{" "}
						<span className="text-blue-600  ">
							{localStorage.getItem("name")
								? localStorage.getItem("name")
								: "User"}{" "}
							!!!
						</span>
					</p>
					<div className="my-5 shadow-md w-[400px]">
						<img
							src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
							width={400}
							height={400}
						></img>
						<div className="my-4 mx-5">
							<p className="font-extrabold my-1  text-lg">
								Details
							</p>
							<p className="text-base font-medium my-1">
								Age:{" "}
								<span className="text-blue-600  ">
									{localStorage.getItem("age")
										? localStorage.getItem("age")
										: "NA"}
								</span>
							</p>
							<p className=" font-medium my-1">
								Gender:{" "}
								<span className="text-blue-600  ">
									{localStorage.getItem("gender")
										? localStorage.getItem("gender")
										: "NA"}
								</span>
							</p>
							<p className=" font-medium my-1">
								Blood Group:{" "}
								<span className="text-blue-600  ">
									{localStorage.getItem("blood_group")
										? localStorage.getItem("blood_group")
										: "NA"}
								</span>
							</p>
							<div className="my-2 flex space-x-3">
								<button
									className="bg-blue-600 text-white text-sm py-1 px-4 rounded-md my-2  border-2 border-blue-500 font-semibold  hover:bg-white hover:text-blue-500 transition-all duration-200"
									onClick={() => setModal(true)}
								>
									Check Blood Report
								</button>
								<button className="bg-green-500 text-white text-sm py-1 px-4 rounded-md my-2  border-2 border-green-500 font-semibold  hover:bg-white hover:text-green-500 transition-all duration-200">
									Edit Details
								</button>
							</div>
						</div>
					</div>
					{modal && (
						<GenericModal
							title="Medical Reports"
							textpos="Okay"
							textneg="Cancel"
							closeHandler={() => setModal(false)}
						>
							<div className="w-[80%]">
								<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
									<div
										style={{
											border: "1px solid rgba(0, 0, 0, 0.3)",
											height: "550px",
										}}
									>
										<Viewer
											onDocumentLoad={(e) =>
												console.log(e)
											}
											fileUrl={localStorage.getItem(
												"pdf"
											)}
										/>
									</div>
								</Worker>
								<button
									className="my-4 bg-green-500 py-1 text-white rounded-sm mx-4 px-5"
									onClick={fetchSummary}
								>
									Summarize my report
								</button>
								{summary != "" && (
									<>
										<p className="my-4 mx-10 text-sm">
											{summary}
										</p>
									</>
								)}
							</div>
						</GenericModal>
					)}
				</div>
				<div className="w-[70%]">
					<h1 className="mt-10 mb-4 text-3xl  font-extrabold text-blue-600">
						Let's Save Lives Together
					</h1>
					<p className=" mx-2">Start by finding your correct Match</p>
					<form>
						<input
							className="focus:outline-none border-b-2 border-blue-600 my-1 mx-2 py-2 px-0 w-[40%] rounded-sm"
							placeholder="Search for an organ"
						></input>
						<button className="bg-blue-600 text-white py-1 px-5 rounded-md border-2 border-blue-600 font-semibold  hover:bg-white hover:text-blue-600 transition-all duration-200">
							Search
						</button>
					</form>
					<p className="my-2 text-sm mx-2 font-semibold">
						Nearby donors
					</p>

					<div className="flex space-x-5 mx-2">
						{allDonors &&
							allDonors.map((d) => (
								<div className="flex flex-col items-center mx-2 shadow-md">
									<img
										src={d.img ? d.img : "profile.png"}
										className="h-[250px] rounded-t-md"
									></img>
									<p className="text-white bg-blue-600 w-full py-2 px-4 text-center font-semibold ">
										{d.fullname}
									</p>
									<div className="my-4 mx-2">
										<p className="font-extrabold my-1  text-lg">
											Details
										</p>
										<p className="text-base font-medium my-1">
											Age:{" "}
											<span className="text-blue-600  ">
												{d.age}
											</span>
										</p>
										<p className=" font-medium my-1">
											Organ:{" "}
											<span className="text-blue-600  ">
												{d.organ ? d.organ : "NA"}
											</span>
										</p>
										<p className=" font-medium my-1">
											Blood Group:{" "}
											<span className="text-blue-600  ">
												{d.blood_group}
											</span>
										</p>
										<div className=" flex space-x-3">
											<button
												className="bg-blue-600 text-white text-sm py-1 px-4 rounded-md my-2  border-2 border-blue-600 font-semibold  hover:bg-white hover:text-blue-500 transition-all duration-200"
												onClick={() => {
													setDetails(true);
													setDonor(d);
												}}
											>
												Details
											</button>
											<button
												className="bg-green-500 text-white text-sm py-1 px-4 rounded-md my-2  border-2 border-green-500 font-semibold  hover:bg-white hover:text-green-500 transition-all duration-200"
												onClick={() => {
													connectWaitList(d);
												}}
											>
												Connect
											</button>
										</div>
									</div>
								</div>
							))}
					</div>
					{details && (
						<GenericModal
							title="Donor Details"
							textpos="Okay"
							textneg="Cancel"
							closeHandler={() => setDetails(false)}
						>
							<>
								<div className="flex">
									<div>
										<img
											src={
												donor.img
													? donor.img
													: "profile.png"
											}
											className="my-5 mx-10 w-[300px] rounded-md"
										></img>
									</div>
									<div>
										<div className="my-4 mx-2">
											<p className="font-extrabold my-1  text-lg">
												Details
											</p>
											<p className="text-base font-medium my-1">
												Name:{" "}
												<span className="text-blue-600  ">
													{donor.fullname}
												</span>
											</p>
											<p className=" font-medium my-1">
												Weight:{" "}
												<span className="text-blue-600  ">
													{donor.weight
														? donor.weight
														: "75" + " kg"}
												</span>
											</p>
											<p className=" font-medium my-1">
												Height:{" "}
												<span className="text-blue-600  ">
													{donor.height
														? donor.height
														: "170" + " cm"}
												</span>
											</p>
											<p className=" font-medium my-1">
												Age:{" "}
												<span className="text-blue-600  ">
													{donor.age}
												</span>
											</p>
											<p className=" font-medium my-1">
												Organ:{" "}
												<span className="text-blue-600  ">
													{donor.organ}
												</span>
											</p>
											<p className=" font-medium my-1">
												Blood Group:{" "}
												<span className="text-blue-600  ">
													{donor.blood_group}
												</span>
											</p>
										</div>
									</div>
								</div>
								<div className="font-bold mx-10 text-lg">
									Medical conditions
								</div>
								<div className="mx-10">
									{donor.healthHistory ? (
										donor.healthHistory.map((d) => (
											<>
												<span className="font-medium">
													{d}
												</span>
												<p className="text-sm my-1 italic">
													{
														"Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Also called major depressive disorder or clinical depression, it affects how you feel, think and behave and can lead to a variety of emotional and physical problems"
													}
												</p>
											</>
										))
									) : (
										<></>
									)}
									<div className="flex  items-center">
										<span className="text-sm text-white bg-blue-300 my-1 py-1 px-3 rounded-full mr-2">
											Andheri
										</span>
										<span className="text-sm text-white bg-gray-300 py-1 px-3 rounded-full mr-2">
											Maharashtra
										</span>
									</div>
								</div>
								<div className="h-[300px]">
									<h1 className="text-sm font-semibold mx-14">
										Transfer Comptability : 70 %
									</h1>
									<Doughnut
										data={data}
										title="Transfer Comptability"
									></Doughnut>
								</div>
							</>
						</GenericModal>
					)}
				</div>
			</div>
		</>
	);
};
export default Profile;
