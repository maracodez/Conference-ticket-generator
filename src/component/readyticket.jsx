import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/index.css'

export const Readyticket = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <div className='text-white text-center py-8 text-2xl'>No user data found</div>
    }
  return (
    <div className='flex flex-col items-center p-6 min-h-screen text-white'>
        <div className="border-b-2 border-b-teal-500 md:flex justify-between items-center w-full pb-3">
            <h5 className=' text-3xl w-1/6 font-bold '>Ready</h5>
            <p className="text-gray-300 text-lg">step 3 / 3</p>
        </div>
        <div className='bg-teal-900 mt-5 rounded-xl p-5 min-h-screen w-3/4 border border-teal-400'>
            <h2 className='text-2xl font-bold text-center py-5'>Your Ticket is Booked!</h2>
            <p className='py-2 text-center'>You can download or Check your email for a copy</p>
            <div className='flex flex-col items-center mt-10'>
                <img src={state.avater} alt="uploaded" />
                <p><strong>Full Name:</strong> {state.fullName}</p>
                <p><strong>Email:</strong> {state.email}</p>
                <p><strong>About the project:</strong> {state.textArea}</p>
            </div>
            <div className='py-2 text-center'>
                <button
                    onClick={() => navigate("/")}
                    className='w-3/6 md:w-2/4 mt-4 bg-teal-850 border border-teal-850 text-white px-4 py-2 mr-5 rounded hover:bg-teal-400'
                >Book Another Ticket</button>
                <button
                    onClick={() => navigate("/")}
                    className='mt-4 bg-teal-850 border border-teal-850 text-white px-4 py-2 rounded hover:bg-teal-400'
                >Download Ticket</button>
            </div>
        </div>
    </div>
  )
}
