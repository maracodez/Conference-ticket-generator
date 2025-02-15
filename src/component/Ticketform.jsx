import { useState, useEffect } from "react";
import upload from "../assets/upload.png";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Ticketform() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
    image: "",
    textArea: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handles form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Load saved form data from local storage
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
        localStorage.removeItem("formData");
      }
    }
  }, []);

  // Save form data to local storage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setErrors((prev) => ({ ...prev, image: "No file selected!" }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Only image files are allowed" }));
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    try {
      const response = await axios.post(import.meta.env.VITE_CLOUDINARY_API_FETCH, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({ ...prev, avatar: response.data.secure_url }));
      setErrors((prev) => ({ ...prev, image: "" }));
    } catch (error) {
      console.error("File upload error:", error);
      setErrors((prev) => ({ ...prev, image: `Upload failed! ${error.message}` }));
    }
    setLoading(false);
  };

  // Validate form inputs
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!formData.textArea.trim()) {
      newErrors.textArea = "Additional information is required.";
      valid = false;
    }
    if (!formData.avatar.trim()) {
      newErrors.avatar = "Avatar URL is required";
      valid = false;
    } else if (!/^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/.test(formData.avatar)) {
      newErrors.avatar = "Invalid image URL format";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    navigate("/readyticket", { state: formData });
  };

  return (
    <div className="bg-[#02191D] flex flex-col items-center p-6 min-h-screen text-white font-sans">
      <div className="border-b-2 border-b-teal-500 md:flex justify-between items-center w-full pb-3">
        <h5 className="text-2xl sm:text-xl w-4/6 lg:w-4/6 sm:w-1/2">Attendee Details</h5>
        <p className="text-gray-300 text-lg">Step 2 / 3</p>
      </div>
      <div className="bg-teal-900 min-h-screen w-3/4 rounded p-2 mt-5">
        <form className="flex flex-col text-[#ccc]" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="block font-medium text-gray-300 mb-3">Upload Profile Photo</label>
            <div className="bg-[#02191D] w-5/5 flex flex-col items-center rounded-xl p-5">
              <div
                className="bg-teal-500 h-32 rounded-2xl cursor-pointer"
                onClick={() => document.getElementById("fileUpload").click()}
              >
                <div className="text-center p-5">
                  {loading ? (
                    "Uploading..."
                  ) : (
                    <img src={upload} alt="Upload" className="w-[20%] mx-auto" />
                  )}
                  <p className="pt-3">Drag & Drop to Upload</p>
                </div>
                <input 
					type="file" 
					id="fileUpload" 
					onChange={handleFileUpload} 
					className="hidden" 
				/>
              </div>
            </div>
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
          </div>

          {/* Full Name */}
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-inherit border border-teal-500 outline-none rounded p-2"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          {/* Email */}
          <label className="mt-3">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-inherit border border-teal-500 outline-none rounded p-2 mt-1"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Text Area */}
          <div>
            <p className="block font-medium text-gray-350 mb-3 mt-2">About the project</p>
            <textarea
              name="textArea"
              placeholder="Textarea"
              className="bg-inherit border w-full h-40 outline-none p-3 text-white font-semibold rounded-md"
              value={formData.textArea}
              onChange={handleChange}
            ></textarea>
            {errors.textArea && <p className="text-red-500">{errors.textArea}</p>}
          </div>

          <div className="flex flex-row mt-7 gap-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-[50%] border border-teal-700 pt-2 pb-2 pr-5 pl-5 rounded hover:bg-[#02191D] cursor-pointer font-bold"
            >
              Back
            </button>
            <button type="submit" className="w-[50%] border border-teal-700 pt-2 pb-2 pr-5 pl-5 rounded hover:bg-[#02191D] cursor-pointer font-bold">
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
