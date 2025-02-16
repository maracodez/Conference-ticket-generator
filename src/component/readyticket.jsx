import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/index.css'
import frame from '../assets/frame.png';
import frame2 from '../assets/frame2.png';
import btns from '../assets/btns.png'

export const Readyticket = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <div className='text-white text-center py-8 text-2xl'>No user data found</div>
    }
  return (
    <div className='flex flex-col items-center p-6 min-h-screen text-white'>
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
        <div className="border-b-2 border-b-teal-500 md:flex justify-between items-center w-full pb-3">
            <h5 className=' text-3xl w-1/6 font-bold '>Ready</h5>
            <p className="text-gray-300 text-lg">step 3 / 3</p>
        </div>
        <div className='bg-teal-900 mt-5 rounded-xl p-5 min-h-screen w-3/4 border border-teal-400'>
            <h2 className='text-2xl font-bold text-center py-5'>Your Ticket is Booked!</h2>
            <p className='py-2 text-center'>You can download or Check your email for a copy</p>
            <div className='w sm:w-[50%] lg:w-[40%] m-auto h-96 bg-gradient-to-t from-teal-800 to-teal-850 border border-teal-700 rounded-3xl'>
                <div className='w sm:w-[100%] md:w-[90%] lg:w-[80%]  rounded p-5 backdrop-blur-lg text-center leading-[5] rounded-3xl m-auto'>
                    <h1 className='font-bold text-2xl hover:text-teal-100'>Techember Fest &quot;25</h1>
					<div className='inline-block text-base'>
						<p className=''>📍 Ebonyi State, Abakaliki </p>
						<p>📅 march 15, 2025| 7:00pm</p>
					</div>
				</div>
                <div className='flex flex-col items-center mt-10'>
                    <img src={state.avater} alt="uploaded" />
                    <p><strong>Full Name:</strong> {state.fullName}</p>
                    <p><strong>Email:</strong> {state.email}</p>
                    <p><strong>About the project:</strong> {state.textArea}</p>
                </div>
            </div>
            <div className='py-2 text-center mt-4'>
                <button
                    onClick={() => navigate("/")}
                    className='w sm:w-30 md:w-80 bg-teal-850 border-2 border-teal-800 text-white px-4 py-2 mr-5 rounded-2xl hover:bg-teal-400'
                >Book Another Ticket</button>
                <button
                    onClick={() => navigate("/")}
                    className='w sm:w-30 md:w-80 bg-teal-850 border-2 border-teal-800 text-white px-4 py-2 rounded-2xl hover:bg-teal-400'
                >Download Ticket</button>
            </div>
        </div>
    </div>
  )
}
