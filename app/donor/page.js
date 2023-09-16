import Grid from "@/components/donor/Grid";
import Carousel from "@/components/donor/Grid";
import Navbar from "@/components/donor/Navbar";
import Link from "next/link";

export default function DonorHomePage(){
    return (
		<div className="space-y-5 flex flex-col">
			<Navbar />
			<div id="content" className="my-5 space-y-5 flex flex-col w-full">
                <div className="text-center text-5xl font-extrabold text-blue-500">Let's Save Lives Together</div>
				<Grid />
				<div className="mx-auto ">
					<Link href={"/donor/donate"}>
						<button className="bg-blue-600 border-2 border-blue-600 px-5 py-4 mb-5 justify-center items-center text-white text-lg font-semibold rounded-md hover:bg-white hover:text-blue-600 transition-all duration-200">
							Click here to donate!
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}