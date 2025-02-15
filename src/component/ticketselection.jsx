import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import frame from '../assets/frame.png';
import frame2 from '../assets/frame2.png';
import btns from '../assets/btns.png'

export default function TicketGenerator() {
const [selectedTicket, setSelectedTicket] = useState("");
	const [ticketCount, setTicketCount] = useState("");
	const navigate = useNavigate();

	const ticketTypes =[
		,
		{name: "Regular Access", price: "Free"},
		{name: "VIP Access", price: "$50"},
		{name: "VVIP Access", price: "$150"},
	]

	//check if the user made a valid selection
	const isNextEnabled = selectedTicket && ticketCount === "1";

	//reset selections
	const handleCancel = () => {
		setSelectedTicket("");
		setTicketCount("");
	};

	//handle form submission
	const handleNext = () => {
		if (isNextEnabled) {
			alert(`Proceeding with ${ticketCount} access.`)
			navigate("/Ticketform")
		}
	};



 return(
	<div className="flex flex-col items-center p-6 text-white">
		<div className='flex flex-row justify-between w-full border border-teal-900 rounded-xl mb-5'>
			<div>
				<img src={frame} alt="" />
			</div>
			<div className='block sm:hidden md:block lg:block'>
				<img src={frame2} alt="" />
			</div>
			<div>
				<img src={btns} alt="" />
			</div>
		</div>
		<div className='w sm:w-[100%] md:w-[90%] lg:w-[80%] bg-teal-950 backdrop-blur-xl p-6  rounded-lg'>
			<div className="border-b-2 border-b-teal-500 flex justify-between items-center w-full pb-2 mb-3">
				<h5 className='text-2xl sm:text-sm md:text-xl lg:text-2xl'>Ticket selection</h5>
				<p className="text-gray-300 text-lg">step 1 / 3</p>
			</div>
			<div className='bg-teal-900 backdrop-blur-xl border border-teal-900 flex flex-col items-center min-h-screen w sm:w-1/4 md:w-2/6 lg:w-3/6 rounded-xl p-2 m-auto'>
				<div className='w sm:w-[100%] md:w-[90%] lg:w-[80%]  rounded p-5 backdrop-blur-lg bg-[#02191D] text-center leading-[5] rounded-3xl border-[1px] border-teal-500 shadow-lg'>
					<h1 className='font-bold text-2xl hover:text-teal-100'>Techember Fest &quot;25</h1>
					<p className='text-center text-sm tracking-wide '>Join us for an unforgettable experience at <br />Techemeber! Secure you spot now!</p>
					<div className='inline-block text-base'>
						<p className='inline-block'>📍 Ebonyi State, Abakaliki <span>| | </span></p>
						<span> march 15, 2025| 7:00pm</span>
					</div>
				</div>
				<div className='text-left border-t-2 border-t-teal-400 mt-5 w sm:w-[100%] lg:w-[90%] pt-4 '>
					<p>Select Ticket Type:</p>
					<div className='flex lg:flex-nowrap md:flex-nowrap sm:flex-nowrap  gap-2 mt-3'>
						{ticketTypes.map((ticket, index) => (
							<div 
								key={index}
								className={` w sm:w-[100%] md:w-[45%] lg:w-[50%] p-2 border-[2px] border-teal-500 text-xl cursor-pointer rounded-xl hover:bg-teal-950  transition  ${selectedTicket === index ? "bg-teal-700 border-teal-900" : "bg-inherit" }`}
								onClick={() => setSelectedTicket(index)}
							>
								<button className=' p-2 rounded text-2xl font-semibold'>{ticket.price}</button>
								<p className='text-[14px]'>{ticket.name}</p>
								<p className='text-sm pt-2'>20/52</p>
							</div>
						))}
					</div>
					
					<div className='mt-8'>
						<h5 className='pb-2'>Number of ticket:</h5>
						<select 
							className='w-[70%] h-8 bg-transparent border outline-none rounded hover:bg-teal-800 cursor-pointer'
							value={ticketCount}
							onChange={(e) => setTicketCount(e.target.value)}
							disabled={!selectedTicket}
						>
							<option className='bg-teal-600 '></option>
							<option className='bg-teal-600'>1</option>
							<option className='bg-teal-600'>2</option>
							<option className='bg-teal-600'>3</option>
							<option className='bg-teal-600'>4</option>
							<option className='bg-teal-600'>5</option>
							<option className='bg-teal-600'>6</option>
							<option className='bg-teal-600'>7</option>
							<option className='bg-teal-600'>8</option>
							<option className='bg-teal-600'>9</option>
							<option className='bg-teal-600'>10</option>
						</select>
					</div>
					
					<div className='flex flex-row mt-7 gap-5'>
						<button 
							className='w-[50%] border border-teal-700 pt-2 pb-2 pr-5 pl-5 rounded hover:bg-[#02191D] cursor-pointer'
							onClick={handleCancel}
						>Cancel</button>
						<button 
							className={`w-[50%] border border-teal-700 pt-2 pb-2 pr-5 pl-5 rounded hover:bg-[#02191D] cursor-pointer transition ${ isNextEnabled ? "bg-teal-500 hover:bg-teal-700" : "bg-inherit"}`}
							onClick={handleNext}
							disabled={!isNextEnabled}
						>Next</button>
					</div>
				</div>
			</div>
		</div>
	</div>
)
}