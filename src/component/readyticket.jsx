import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/index.css'

export const Readyticket = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <div className='text-white'>No user data found</div>
    }
  return (
    <div className='bg-[#02191D]  flex flex-col items-center p-6 min-h-screen text-white font-sans'>
        <div className="border-b-2 border-b-teal-500 md:flex justify-between items-center w-full pb-3">
			<h5 className=' text-2xl w-4/6'>Ready</h5>
			<p className="text-gray-300 text-lg">step 3 / 3</p>
		</div>
        <div>
            <h2>Your Ticket is Booked</h2>
            <p>You can download or Check your email for a copy</p>
            <div>
                <img src={state.avater} alt="uploaded" />
                <p><strong>Full Name</strong>{state.fullName}</p>
                <p><strong>Email:</strong>{state.email}</p>
                <p><strong>About the project</strong>{state.textArea}</p>
            </div>
            <button
                onClick={() => navigate("/")}
                className='mt-4 bg-teal-850 text-white px-4 py-2 rounded hover:bg-teal-400'
            >Download Ticket</button>
        </div>
    </div>
  )
}
