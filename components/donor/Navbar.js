import Link from "next/link";
import {waitlist} from "./data/waitlist";

export default function Navbar(){
    return (
		<div className="bg-blue-600 px-10 py-5 flex flex-row justify-between items-center">
			<Link href={"/donor"}>
				<div id="title" className="text-3xl font-bold text-white">
					OrganConnect
				</div>
			</Link>
			<div className="flex flex-row space-x-5">
                <Link href={'/donor/waitlist'}>
                    {waitlist.length ? <button className="text-white">Check waitlist</button>:<></>}
                </Link>
				<div className="rounded-full w-10 h-10 bg-white text-center align-middle">
					KM
				</div>
			</div>
		</div>
	);
}