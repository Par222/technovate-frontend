"use client"
import GenericModal from "@/components/GenericModal";
import Navbar from "@/components/donor/Navbar";
import UserDetails from "@/components/donor/UserDetails";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Appointment(){
    const response = {
		donorId: {
			fullname: "John Doe",
			age: 30,
			blood_group: "O+",
			gender: "Male",
			organ: "Kidney",
		},
		recipientId: {
			fullname: "Jane Doe",
			age: 25,
			blood_group: "A-",
			gender: "Female",
		},
		datetime: "2023-09-20T14:30:00",
		hospital_name: "City Medical Center",
		hospital_location: "123 Main Street, Anytown, USA",
		reason_for_transplant: "End-stage renal disease",
	};
    const [data, setData] = useState()
    const [showModal, setShowModal] = useState(false)
    const [recipient, setRecipient] = useState()
    function closeHandler(){
        setShowModal(false)
    }
    async function fetchAppointments(){
        const response = await axios.get(
			`https://technovate-backend.onrender.com/hospital/appointments/${localStorage.getItem('user_id')}`
		);
        console.log(response)
        setData(response.data.data)
    }
    useEffect(() => {
        fetchAppointments()
    }, [])
    return (
		<div>
			<Navbar />
			{showModal && (
				<GenericModal
					title="Donor Details"
					textpos="Okay"
					textneg="Cancel"
					closeHandler={closeHandler}
				>
					<>
						<div className="flex">
							<div>
								<img
									src={
										recipient.img
											? recipient.img
											: "./profile.png"
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
											{recipient.fullname}
										</span>
									</p>
									<p className=" font-medium my-1">
										Weight:{" "}
										<span className="text-blue-600  ">
											{recipient.weight
												? recipient.weight
												: "70" + " kg"}
										</span>
									</p>
									<p className=" font-medium my-1">
										Height:{" "}
										<span className="text-blue-600  ">
											{recipient.height
												? recipient.height
												: "175" + " cm"}
										</span>
									</p>
									<p className=" font-medium my-1">
										Age:{" "}
										<span className="text-blue-600  ">
											{recipient.age}
										</span>
									</p>
									<p className=" font-medium my-1">
										Organ:{" "}
										<span className="text-blue-600  ">
											{recipient?.organ}
										</span>
									</p>
									<p className=" font-medium my-1">
										Blood Group:{" "}
										<span className="text-blue-600  ">
											{recipient.blood_group}
										</span>
									</p>
								</div>
							</div>
						</div>
						<div className="font-bold mx-10 text-lg">
							Medical conditions
						</div>
						<div className="mx-10">
							{recipient.healthHistory ? (
								<div>
									{recipient.healthHistory.map((d) => (
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
									))}
								</div>
							) : (
								<div className="font-medium">N/A</div>
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
					</>
				</GenericModal>
			)}
			{data && data.map((app, index) => {
                return(
                    <div className="px-10 flex flex-row justify-center space-x-10 py-10">
					<div className="flex space-y-2 flex-col">
						<div className="font-semibold">Donor:</div>
						<UserDetails
							userDetails={app.donorId}
							setShowModal={setShowModal}
							setRecipient={setRecipient}
						/>
					</div>
					<div className="flex space-y-2 flex-col">
						<div className="font-semibold">Recipient:</div>
						<UserDetails
							userDetails={app.recipientId}
							setShowModal={setShowModal}
							setRecipient={setRecipient}
						/>
					</div>
					<div className="border-2 border-black rounded-md px-5 py-5 flex flex-col justify-center items-center font-semibold">
						<div>
							Hospital:{" "}
							<span className="font-normal">
								{app.hospital_name}
							</span>
						</div>
						<div>
							Location:{" "}
							<span className="font-normal">
								{app.hospital_location}
							</span>
						</div>
						<div>
							Date:{" "}
							<span className="font-normal">
								{moment(app.datetime).format("DD-MM-YYYY")}
							</span>
						</div>
						<div>
							Time:{" "}
							<span className="font-normal">
								{moment(app.datetime).format("HH:MM")}
							</span>
						</div>
					</div>
				</div>
                )
            })}
		</div>
	);
}