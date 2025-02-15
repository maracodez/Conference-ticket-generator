import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
	<div className="bg-teal-950 flex flex-col items-center p-6 max-h-100 text-white font-sans">
		<div className="border-b-2 border-b-teal-500 md:flex justify-between items-center w-full pb-2 mb-3">
			<h5 className=' text-2xl w-4/6'>Ticket selection</h5>
			<p className="text-gray-300 text-lg">step 1 / 3</p>
		</div>
		<div className='bg-teal-900 flex flex-col items-center min-h-screen w-3/4 rounded p-2'>
			<div className='w-[90%] rounded p-5 backdrop-blur-lg bg-[#02191D] text-center leading-[3] rounded-3xl border-[1px] border-teal-500 shadow-lg'>
				<h1 className='font-bold text-3xl hover:text-teal-100'>Techember Fest &quot;25</h1>
				<p className='text-center text-sm '>Join us for an unforgettable experience at <br />Techemeber! Secure you spot now!</p>
				<div className='inline-block text-xs'>
					<p className='inline-block'>Ebonyi State, Abakaliki <span>| | </span></p>
					<span> march 15, 2025| 7:00pm</span>
				</div>
			</div>
			<div className='text-left border-t-2 border-t-teal-400 mt-5 w-[90%] pt-5 '>
				<p>Select Ticket Type:</p>
				<div className='flex flex-wrap gap-2 mt-3'>
					{/* free */}
					{ticketTypes.map((ticket, index) => (
						<div 
							key={index}
							className={`relative w-[45%] p-3 cursor-pointer rounded-xl hover:bg-teal-950  transition  ${selectedTicket === index ? "bg-teal-700 border-teal-900" : "bg-inherit" }`}
							onClick={() => setSelectedTicket(index)}
						>
							
							<h2 className='uppercase font-semibold text-xl'>{ticket.name}</h2>
							<button className='absolute top-2 right-3 float-right bg-[#02191D] p-2 rounded border-[1px] border-teal-600 p-3'>{ticket.price}</button>
							<p className='text-sm pt-5'>20 left!</p>
						</div>
					))}
				</div>
				
				<div className='mt-8'>
					<h5 className='pb-2'>Number of ticket:</h5>
					<select 
						className='w-[70%] bg-transparent border outline-none rounded hover:bg-teal-800 cursor-pointer'
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
)
}