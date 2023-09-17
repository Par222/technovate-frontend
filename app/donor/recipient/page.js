"use client"
import Bot from "@/components/bot/Bot";
import Navbar from "@/components/donor/Navbar";
import axios from "axios";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import "regenerator-runtime/runtime";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const DocViewer = dynamic(() => import("react-doc-viewer"), { ssr: false });
export default function Chat(){
	const bloodResult = "https://firebasestorage.googleapis.com/v0/b/miniproject-testpal.appspot.com/o/blood_report%2F100910424_100065099.pdf?alt=media&token=d7124aa0-b6d8-496a-9630-1f9690bcca5f"
	const recipient = {
		name: "Sarah Johnson",
		age: 35,
		gender: "Female",
		height: 165,
		weight: 70,
		bloodGroup: "A+",
		organ: "Kidney",
		healthHistory: [],
		img: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg",
	}

	async function getMatchedParticipant(){
		const response = await axios.post(
			"https://technovate-backend.onrender.com/recipient/match"
		);
		console.log(response)
	}

	useEffect(() => {
		getMatchedParticipant()
	}, [])

	const [rendererList, setRendererList] = useState([]);

	useEffect(() => {
		import("react-doc-viewer")
			.then((module) => {
				setRendererList(module.DocViewerRenderers);
			})
			.catch((error) => {
				alert(error);
			});
	}, []);

	const [showBot, setShowBot] = useState(false);

    return (
		<div>
			<Navbar />
			{<Bot showBot={showBot} setShowBot={setShowBot}></Bot>}
			<div id="content" className="my-5 px-10 space-y-5 w-full">
				<div id="title" className="text-3xl font-bold text-blue-500">
					Matched Recipient
				</div>
				<div id="content" className="flex flex-row space-x-10 text-lg">
					<div className="mx-5 shadow-md flex w-[50%] items-center">
						<img
							className="w-[350px] h-[350px]"
							src="https://profilemagazine.com/wp-content/uploads/2022/12/Kenneth-Miles-First-Fidelity-Bank-thumbnail.jpg"
						></img>
						<div className="mx-4">
							<p className="font-medium my-1">
								Name:{" "}
								<span className="text-blue-600  ">
									{"Arun Mehta"}
								</span>
							</p>
							<p className=" font-medium my-1">
								Weight:{" "}
								<span className="text-blue-600  ">
									{"84 kg"}
								</span>
							</p>
							<p className=" font-medium my-1">
								Height:{" "}
								<span className="text-blue-600  ">
									{"178 cm"}
								</span>
							</p>
							<p className=" font-medium my-1">
								Age:{" "}
								<span className="text-blue-600  ">{"39"}</span>
							</p>
							<p className=" font-medium my-1">
								Organ:{" "}
								<span className="text-blue-600  ">
									{"Kidney"}
								</span>
							</p>
							<p className=" font-medium my-1">
								Blood Group:{" "}
								<span className="text-blue-600  ">O+</span>
							</p>
							<button
								className="mt-7 bg-blue-600 text-white py-2 px-4 rounded-md my-2  border-2 border-blue-600 font-semibold  hover:bg-white hover:text-blue-600 transition-all duration-200"
								onClick={() => setShowBot(true)}
							>
								Start Chat
							</button>
						</div>
					</div>
					<div>
						<div id="title" className="font-semibold text-2xl">
							{" "}
							Blood Report
						</div>
						<DocViewer
							pluginRenderers={rendererList}
							documents={[{ uri: bloodResult, fileType: "pdf" }]}
							config={{
								header: {
									disableHeader: true,
									disableFileName: true,
									retainURLParams: true,
								},
								pdfZoom: {
									defaultZoom: -0.6, // Adjust the value to fit the PDF within the width
								},
							}}
							theme={{
								disableThemeScrollbar: true,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}