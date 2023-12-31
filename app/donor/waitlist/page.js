"use client"
import GenericModal from "@/components/GenericModal";
import Navbar from "@/components/donor/Navbar";
import UserDetails from "@/components/donor/UserDetails";
import { organs } from "@/components/donor/data/organs";
import { waitlist } from "@/components/donor/data/waitlist";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Waitlist(){
    const [showModal, setShowModal] = useState(false)
    const [recipient, setRecipient] = useState()
    const [waitlist, setWaitlist] = useState([])
    const [organs, setOrgan] = useState()
    function closeHandler(){
        setShowModal(false)
    }
    async function getWaitlists(){
        const response = await axios.post(
			"https://technovate-backend.onrender.com/donor/recipientList",{
                donor_id: localStorage.getItem("user_id")
            }
		);
        setOrgan(response.data.data.organ)
        setWaitlist(response.data.data.organQueue)
    }
    useEffect(() => {
        getWaitlists()
    }, [])
    return (
		<div>
			<Navbar />
			<div id="content" className="my-5 px-10">
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
										src={recipient.img?recipient.img:"./profile.png"}
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
												{recipient.weight?recipient.weight:"70" + " kg"}
											</span>
										</p>
										<p className=" font-medium my-1">
											Height:{" "}
											<span className="text-blue-600  ">
												{recipient.height?recipient.height:"175" + " cm"}
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
												{organs}
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
				<div id="title" className="text-3xl font-bold text-blue-500">
					Pending Waitlist
				</div>
				<div>
					<div>
						{waitlist.length > 0 ? (
							<div className="my-5 space-y-2">
								<div
									id="title"
									className="text-xl font-semibold"
								>
									{organs}
								</div>
								<div className="flex flex-row space-x-5 px-10">
									{waitlist.map((p, index) => {
										return (
											<UserDetails
												userDetails={p}
												setShowModal={setShowModal}
												setRecipient={setRecipient}
											/>
										);
									})}
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}