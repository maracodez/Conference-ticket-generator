//import { useState } from 'react'
import { useState, useEffect } from 'react';
import upload from '../assets/upload.png'
import '../styles/index.css'

export default function Ticketform() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		avatar: "",
		textArea: "",
	});
	const [errors, setErrors] = useState({});
	const [ticket, setTicket] = useState(null);
	const [loading, setLoading] = useState(false)

	// Handles file drag & drop
	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			handleFileUpload(file);
		}
	};

	//load saved form data from localstorage
	useEffect(() => {
		const savedData = localStorage.getItem("formData");
		if (savedData) {
			try {
				const parsedData = JSON.parse(savedData);
				if (parsedData) {
					setFormData(parsedData);
				}
			} catch (error) {
				console.error("Error parsing JSON from localStorage", error);
				localStorage.removeItem("formData")
			}
		}
	}, [])
		

	//save from data to localstorage
	useEffect(() => {
		localStorage.setItem("formData", JSON.stringify(formData))
	}, [formData]);

	//handle input change
	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]:e.target.value });
	};

	//validate form inputs
	const validateForm = () => {
		let newErrors = {};

		if (!formData.fullName.trim())newErrors.fullName = "Full name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required"
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format"
		}if (!formData.avatar.trim()) {
			newErrors.avatar = "Avatar URL is required";
		  } else if (!/^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/.test(formData.avatar)) {
			newErrors.avatar = "Invalid image URL format";
		  }
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	const handleFileUpload = async(file) => {

		if (!file) {
			console.error("No file selected!");
			return;
		}
	
		console.log("Uploading file:", file);
		

		if (!(file instanceof File)) {
			console.error("Invalid file format:", file);
			alert("Invalid file format!");
			return;
		}

		  setLoading(true)

		const data = new FormData()
		data.append("file", file)
		data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
		data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME)


		try {

			const response = await fetch(import.meta.env.VITE_CLOUDINARY_API_FETCH, {
				method:"POST",
				body: data
			});

			if (!response.ok) {
				const errorText = await response.text(); // Get error details
      			throw new Error(`Upload failed with status: ${response.status} - ${errorText}`);
			  }

			const uploadedImageUrl = await response.json();
			console.log(uploadedImageUrl.url)
		} catch (error) {
			console.error("File upload error:", error);
			alert(`Upload failed! ${error.message}`);
		}
		setLoading(false)
		
	}

	//handle submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			setTicket({ ...formData })
			
		}
	}


	return (
	<div className='bg-[#02191D]  flex flex-col items-center p-6 min-h-screen text-white font-sans'>
		<div className="border-b-2 border-b-teal-500 md:flex justify-between items-center w-full pb-3">
			<h5 className=' text-2xl w-4/6'>Attendee Details</h5>
			<p className="text-gray-300 text-lg">step 2 / 3</p>
		</div>
		<div className='bg-teal-900 min-h-screen w-3/4 rounded p-2 mt-5'>
			<form 
				className='flex flex-col text-[#ccc] '
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col '>
					<label className='block font-medium text-gray-300 mb-9'>Upload Profile Photo</label>
					<div className='bg-[#02191D] w-5/5 flex flex-col items-center rounded-xl p-5'>
						<div 
							className='bg-teal-500 h-32 rounded-2xl' 
							onDragOver={(e) => e.preventDefault()}
							onDrop={handleDrop}
							onClick={() => document.getElementById("fileUpload").click()}
						>
							<div className='text-center p-5'>
								{
									loading ? "Uploading..." : <img 
										src={upload} 
										alt="" 
										className='w-[20%] mx-auto'
									/>
								}
								
								<p className='pt-3 cursor-pointer'> Drag & Drop to Upload</p>
							</div>
							<input 
								type="file" 
								id='fileUpload'
								onChange={handleFileUpload}
								className='hidden'
							/>
						</div>
					</div>
					{errors.avater && (
					<p id='avaterError' className='text-red-500 text-sm'>{errors.avater}</p>
					)}
				</div>
				<label>Full Name:</label>
				<input 
					type="text" 
					placeholder='enter your name'
					name='fullName' 
					value={formData.fullName}
					onChange={handleChange}
					className='bg-inherit border border-teal-500 outline-none rounded p-2'
					aria-describedby='fullNameError'
				/>
				{errors.fullName && (
					<p id='fullNameError' className='text-red-500 text-sm'>{errors.fullName}</p>
				)}

				{/* email */}
				<label className='mt-3'>Email:</label>
				<input 
					type="email" 
					placeholder='enter email'  
					name='email' 
					value={formData.email}
					onChange={handleChange}
					className='bg-inherit border border-teal-500 outline-none rounded p-2 mt-1'
					aria-describedby='emailError'
				/>
				{errors.email && (
					<p id='emailError' className='text-red-500 text-sm'>{errors.email}</p>
				)}

				{/* Text area */}
				<div>
					<p className="block font-medium text-gray-350 mb-3 mt-2">
					About the project
					</p>
					<textarea
						placeholder="Textarea"
						className="bg-inherit border w-full h-40 outline-none p-3 text-white font-semibold rounded-md"
						value={formData.textArea}
						onChange={(e) => setFormData({ ...formData, textArea: e.target.value })}
						required
					></textarea>
				</div>

				{/* avater 
				<label className='mt-3'>Avatar URl</label>
				<input 
					type="text" 
					name='avater' 
					value={formData.avater}
					onChange={handleChange}
					placeholder='https://example.com/image.jpg'
					className='bg-inherit border border-teal-500 outline-none rounded p-2'
					aria-describedby='avaterError'
				/>
				{errors.avater && (
					<p id='avaterError' className='text-red-500 text-sm'>{errors.avater}</p>
				)}
					*/}
				
				<div className='flex flex-row mt-7 gap-5'>
					<button 
						type='button'
						// onClick={() => navigate("/")}
						className='w-[50%] border border-teal-700 pt-2 pb-2 pr-5 pl-5 rounded hover:bg-[#02191D] cursor-pointer font-bold'
					>Back</button>
					<button 
						className='w-[50%] border border-teal-700 pt-2 pb-2 pr-5 pl-5 rounded hover:bg-[#02191D] cursor-pointer font-bold'
						type='submit'
					> Get My Free Ticket</button>
				</div>
			</form>
		</div>

		{ticket && (
			<div>
				<h3>Conference Ticket</h3>
				<img src={ticket.avater}alt="Avater" />
				<p>{ticket.fullName}</p>
				<p>{ticket.email}</p>
			</div>
		)}
	</div>
	)
}