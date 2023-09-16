export default function Card({content, author, path}){
    return (
		<div className="flex flex-row space-x-2 justify-center w-[70%] mx-auto">
			<div className="bg-blue-100 rounded-md py-5 px-5 space-y-14 flex flex-col items-center w-full">
				<div className="text-center align-middle text-lg italic">
					{content}
				</div>
				<div className="text-right w-full">~ {author}</div>
			</div>
			<img src={path} alt="" className="h-48" />
		</div>
	);
}