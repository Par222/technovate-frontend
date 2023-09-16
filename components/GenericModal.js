const GenericModal=(props)=>{
    return (
		<>
			<div
				className="w-full h-full bg-black opacity-70 absolute top-0 left-0 z-10"
				onClick={props.closeHandler}
			></div>
			<div className="absolute z-50 top-[10%] left-[25%] w-[50%] h-[80%]  bg-white rounded-md">
				<h1 className="w-full py-2 px-3 bg-blue-600 text-white text-lg font-bold">
					{props.title}
				</h1>
				<div className="h-[70%] overflow-auto">{props.children}</div>
				<footer className="flex my-2 justify-end mx-4">
					<button
						onClick={props.closeHandler}
						className="bg-blue-600 text-white  text-sm rounded-full py-2 px-4 mx-4 border-2 border-blue-600 font-semibold  hover:bg-white hover:text-blue-500 transition-all duration-200"
					>
						{props.textpos}
					</button>
					<button
						onClick={props.closeHandler}
						className="bg-red-600 text-white  text-sm rounded-full py-2 px-4 mx-4 border-2 border-red-600 font-semibold  hover:bg-white hover:text-red-500 transition-all duration-200"
					>
						{props.textneg}
					</button>
				</footer>
			</div>
		</>
	);
}
export default GenericModal