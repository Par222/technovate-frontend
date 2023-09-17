export default function UserDetails({userDetails, setShowModal, setRecipient}){
    console.log(userDetails)
    return (
		<div className="flex flex-col border-2 border-black pb-2 rounded-md">
			<img
				src={userDetails.img?userDetails.img:"profile.png"}
				alt=""
				className="w-[300px] h-[205px] rounded-t-md"
			/>
			<div className="space-y-2">
				<div className="bg-blue-500 py-2 text-white font-semibold px-3">
					{userDetails.fullname}
				</div>
				<div className="px-3">Age: {userDetails.age}</div>
				<div className="px-3">
					Blood Group: {userDetails.blood_group}
				</div>
			</div>
			<div className="px-3 flex flex-row space-x-2 justify-end items-center py-2">
				<div className="bg-blue-500 rounded-sm px-2 py-1 text-white hover:bg-white hover:text-blue-500 transition-all duration-200 border-2 border-blue-500 cursor-pointer text-sm text-center" onClick={() => {
                    setShowModal(true)
                    setRecipient(userDetails)
                    window.scrollTo(0,0)
                }}>
					View More
				</div>
			</div>
		</div>
	);
}