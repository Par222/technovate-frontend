"use client"
import Navbar from "@/components/donor/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Donate(){
    const [checked, setChecked] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [option, setOption] = useState("")
    const router = useRouter()
    return (
		<div>
			<Navbar />
			<div id="content" className="my-5 px-10 space-y-5 w-full">
				<div id="title" className="text-3xl font-bold text-blue-500">
					Donation Details:
				</div>
				{proceed ? (
					<div className="flex flex-row w-full justify-center items-center space-x-3 text-lg">
						<div>Select organ to donate:</div>
						<select
							name="organ"
							id=""
							className="px-1 border-2 border-blue-500 rounded-sm py-2"
							onChange={(e) => {
								setOption(e.target.value);
								console.log(e.target.value);
							}}
						>
							<option value="Heart">Heart</option>
							<option value="Kidney">Kidney</option>
							<option value="Liver">Liver</option>
							<option value="Lungs">Lungs</option>
							<option value="Pancreas">Pancreas</option>
						</select>
					</div>
				) : (
					<div id="t&c" className="px-10 space-y-3">
						<div className="w-full text-center text-lg font-bold">
							Terms and Conditions
						</div>
						<p>
							The primary legislation related to organ donation
							and transplantation in India, Transplantation of
							Human Organs Act, was passed in 1994 and is aimed at
							regulation of removal, storage and transplantation
							of human organs for therapeutic purposes and for
							prevention of commercial dealings in human organs.
						</p>
						<p>
							In India, matters related to health are governed by
							each state. The Act was initiated at the request of
							Maharashtra, Himachal Pradesh and Goa (who therefore
							adopted it by default) and was subsequently adopted
							by all states except Andhra Pradesh and Jammu
							&Kashmir. Despite a regulatory framework, cases of
							commercial dealings in human organs were reported in
							the media. An amendment to the act was proposed by
							the states of Goa, Himachal Pradesh and West Bengal
							in 2009 to address inadequacies in the efficacy,
							relevance and impact of the Act. The amendment to
							the Act was passed by the parliament in 2011, and
							the rules were notified in 2014. The same is adopted
							by the proposing states and union territories by
							default and may be adopted by other states by
							passing a resolution.
						</p>{" "}
						<p className="font-semibold">
							The main provisions of the Act (including the
							amendments and rules of 2014) are as follows:
						</p>{" "}
						<ol className="list-decimal px-10">
							<li>
								Brain death identified as a form of death.
								Process and criteria for brain death
								certification defined (Form 10 )
							</li>
							<li>
								Allows transplantation of human organs and
								tissues from living donors and cadavers (after
								cardiac or brain death)
							</li>
							<li>
								Regulatory and advisory bodies for monitoring
								transplantation activity and their constitution
								defined.
								<ol className="list-disc px-10">
									<li>
										Appropriate Authority (AA): inspects and
										grants registration to hospitals for
										transplantation enforces required
										standards for hospitals, conducts
										regular inspections to examine the
										quality of transplantations. It may
										conduct investigations into complaints
										regarding breach of provisions of the
										Act, and has the powers of a civil court
										to summon any person, request documents
										and issue search warrants.
									</li>
									<li>
										Advisory Committee: consisting of
										experts in the domain who shall advise
										the appropriate authority.
									</li>
									<li>
										Authorization Committee (AC): regulates
										living donor transplantation by
										reviewing each case to ensure that the
										living donor is not exploited for
										monetary considerations and to prevent
										commercial dealings in transplantation.
										Proceedings to be video recorded and
										decisions notified within 24 hours.
										Appeals against their decision may be
										made to the state or central government.
									</li>
									<li>
										Medical board (Brain Death Committee):
										Panel of doctors responsible for brain
										death certification. In case of
										non-availability of neurologist or
										neurosurgeon, any surgeon, physician,
										anaesthetist or intensivist, nominated
										by medical administrator in-charge of
										the hospital may certify brain death.
									</li>
								</ol>
							</li>
							<li>
								Living donors are classified as either a near
								relative or a non-related donor.
								<ol className="list-disc px-10">
									<li>
										A near-relative (spouse, children,
										grandchildren, siblings, parents and
										grandparents) needs permission of the
										doctor in-charge of the transplant
										center to donate his organ.
									</li>
									<li>
										A non-related donor needs permission of
										an Authorization Committee established
										by the state to donate his organs.
									</li>
								</ol>
							</li>
							<li>
								Swap Transplantation: When a near relative
								living donor is medically incompatible with the
								recipient, the pair is permitted to do a swap
								transplant with another related unmatched
								donor/recipient pair.
							</li>
							<li>
								Authorization for organ donation after brain
								death
								<ol className="list-disc px-10">
									<li>
										May be given before death by the person
										himself/herself or
									</li>
									<li>
										By the person in legal possession of the
										body. A doctor shall ask the patient or
										relative of every person admitted to the
										ICU whether any prior authorization had
										been made. If not, the patient or his
										near relative should be made aware of
										the option to authorize such donation.
									</li>
									<li>
										Authorization process for organ or
										tissue donation from unclaimed bodies
										outlined.
									</li>
								</ol>
							</li>
							<li>
								Organ retrieval permitted from any hospital with
								ICU facility once registered with the
								appropriate authority. Any hospital having
								Intensive Care Unit (ICU) facilities along with
								manpower, infrastructure and equipment as
								required to diagnose and maintain the brain-stem
								dead person and to retrieve and transport organs
								and tissues including the facility for their
								temporary storage, can register as a retrieval
								center.
							</li>
							<li>
								Cost of donor management, retrieval,
								transportation and preservation to be borne by
								the recipient, institution, government, NGO or
								society, and not by the donor family.
							</li>
							<li>
								Procedure for organ donation in medico-legal
								cases defined to avoid jeopardizing
								determination of the cause of death and delay in
								retrieval of organs.
							</li>
							<li>
								Manpower and Facilities required for
								registration of a hospital as a transplant
								center outlined.
							</li>
							<li>
								Infrastructure, equipment requirements and
								guidelines and standard operating procedures for
								tissue banks outlined.
							</li>
							<li>
								Qualifications of transplant surgeons, cornea
								and tissue retrieval technicians defined.
							</li>
							<li>
								Appointment of transplant coordinators (with
								defined qualifications) made mandatory in all
								transplant centers.
							</li>
							<li>
								Non-governmental organisations, registered
								societies and trusts working in the field of
								organ or tissue removal, storage or
								transplantation will require registration.
							</li>
							<li>
								The central government to establish a National
								Human Organs and Tissues Removal and Storage
								Network i.e. NOTTO (National Organ & Tissue
								Transplant Organisation), ROTTO (Regional Organ
								& Tissue Transplant Organisation) and SOTTO
								(State Organ & Tissue Transplant Organisation).
								Website www.notto.nic.in. Manner of establishing
								National or Regional or State Human Organs and
								Tissues Removal and Storage Networks and their
								functions clearly stated.
							</li>
							<li>
								The central government shall maintain a registry
								of the donors and recipients of human organs and
								tissues.
							</li>
							<li>
								Penalties for removal of organ without
								authority, making or receiving payment for
								supplying human organs or contravening any other
								provisions of the Act have been made very
								stringent in order to serve as a deterrent for
								such activities.
							</li>
						</ol>
					</div>
				)}
				{!proceed ? (
					<div className="w-full flex justify-center">
						<input
							type="checkbox"
							name=""
							id=""
							onChange={(e) => {
								setChecked(e.target.checked);
							}}
							checked={checked}
						/>
						<span className="px-3">Do you wish to continue?</span>
					</div>
				) : (
					<></>
				)}
				<div className="flex justify-center">
					<button
						className={`bg-blue-600 px-4 py-3 justify-center items-center text-white text-lg font-semibold rounded-md  ${
							!checked
								? "cursor-not-allowed bg-blue-400"
								: "cursor-pointer hover:bg-blue-500 transition-all duration-200"
						}`}
						disabled={!checked}
						onClick={() => {
							if (proceed === true) {
								console.log(option);
								router.push("/donor/waitlist");
							}
							setProceed(true);
						}}
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
}