import "./UserRegistration.css";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../store/formDataSlice";

const UserRegistration = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const validateMobileNumber = (mobileNumber) => {
    // Regular expression for a 10-digit mobile number
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      dispatch(updateFormData({ [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //
    if (!formData.name) {
      toast.error("Please enter a name.");
      return;
    }
    // Validate email and mobile number
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Handle form submission here (e.g., data storage)
    console.log("Form Data:", formData);
    navigate("/game");
  };

  return (
    <div className="registration-container">
      <img
        src={logo}
        className="register-logo
"
      />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficultyLevel">Difficulty Level:</label>
          <select
            id="difficultyLevel"
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default UserRegistration;
