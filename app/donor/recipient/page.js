"use client"
import Navbar from "@/components/donor/Navbar";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
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

    return (
		<div>
			<Navbar />
			<div id="content" className="my-5 px-10 space-y-5 w-full">
				<div id="title" className="text-3xl font-bold text-blue-500">
					Matched Recipient
				</div>
				<div
					id="content"
					className="flex flex-row space-x-10 text-lg justify-center "
				>
					<div className="flex flex-col space-y-5">
						<div>
							<img src={recipient.img} alt="" className="h-64" />
						</div>
						<div className="flex flex-col">
							<div>
								<span className="font-semibold">Name:</span>{" "}
								{recipient.name}
							</div>
							<div>
								<span className="font-semibold">Age:</span>{" "}
								{recipient.age}
							</div>
							<div>
								<span className="font-semibold">Gender:</span>{" "}
								{recipient.gender}
							</div>
							<div>
								<span className="font-semibold">Height:</span>{" "}
								{recipient.height} cm
							</div>
							<div>
								<span className="font-semibold">Weight:</span>{" "}
								{recipient.weight} kg
							</div>
							<div>
								<span className="font-semibold">
									Blood Group:
								</span>{" "}
								{recipient.bloodGroup}
							</div>
							<div>
								<span className="font-semibold">Organ:</span>{" "}
								{recipient.organ}
							</div>
							<div className="c">
								<span className="font-semibold">
									Health History:
								</span>
								{recipient.healthHistory.length > 0 ? (
									<div>
										{recipient.healthHistory.map(
											(health, index) => {
												return <div>{health}</div>;
											}
										)}
									</div>
								) : (
									<div>N/A</div>
								)}
							</div>
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