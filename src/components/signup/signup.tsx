import React from "react";
import "./signup.css";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

interface SignupProps {
  onCloseSignup: () => void;
}

// Define type for form values
type FormValues = {
  clientType: string;
  region: string;
  idNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
};

const Signup: React.FC<SignupProps> = ({ onCloseSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitForm = (data: FormValues) => {
    console.log(data);
    onCloseSignup();
  };

  return (
    <Modal
      className="modal-signup"
      isOpen={true}
      onRequestClose={onCloseSignup}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="signup">
        <h3>Create Account</h3>
        <div className="inputs">
          <label htmlFor="clientType">Select Client Type: </label>
          <select
            id="clientType"
            className="input-select"
            {...register("clientType", { required: "required*" })}
          >
            <option value="">Select an option</option>
            <option value="citizen">Citizen</option>
            <option value="business">Business</option>
            <option value="government">Government (employee or agency)</option>
          </select>
          {errors.clientType && (
            <p className="inputs-error">{errors.clientType.message}</p>
          )}
        </div>
        <div className="inputs">
          <p>Region of Residence:</p>
          <input
            className="input-select"
            {...register("region", { required: "Region is required" })}
          />
          {errors.region && (
            <p className="inputs-error">{errors.region.message}</p>
          )}
        </div>
        <div className="inputs">
          <p>ID Number:</p>
          <input
            className="input-select"
            {...register("idNumber", { required: "ID Number is required" })}
          />
          {errors.idNumber && (
            <p className="inputs-error">{errors.idNumber.message}</p>
          )}
        </div>
        <div className="inputs">
          <p>First Name:</p>
          <input
            className="input-select"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <p className="inputs-error">{errors.firstName.message}</p>
          )}
        </div>
        <div className="inputs">
          <p>Last Name:</p>
          <input
            className="input-select"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <p className="inputs-error">{errors.lastName.message}</p>
          )}
        </div>
        <div className="inputs">
          <p>Email:</p>
          <input
            className="input-select"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="inputs-error">{errors.email.message}</p>
          )}
        </div>
        <div className="inputs">
          <p>Phone Number:</p>
          <input
            className="input-select"
            type="number"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="inputs-error">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="footer">
          <button type="submit" className="signup-btn">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Signup;
