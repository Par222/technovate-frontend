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
			<div className="flex flex-row space-x-5 items-center">
                <Link href={'/donor/waitlist'}>
                    {waitlist.length ? <button className="text-white border-b-2 border-blue-600 hover:border-white px-2 transition-all duration-100 text-center">Check waitlist</button>:<></>}
                </Link>
                
                <Link href={'/appointment'}>
                    {waitlist.length ? <button className="text-white border-b-2 border-blue-600 hover:border-white px-2 transition-all duration-100 text-center">Check Appointment</button>:<></>}
                </Link>
                <Link href={'/donor/recipient'}>
                    {waitlist.length ? <button className="text-white border-b-2 border-blue-600 hover:border-white px-2 transition-all duration-100 text-center">Matched Recipient</button>:<></>}
                </Link>

			</div>
		</div>
	);
}