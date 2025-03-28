import React, { useCallback, useState } from "react";
import { Button } from "./reuse/Button";
import { Input } from "./reuse/Input";
import { Link, useNavigate } from "react-router-dom";
import api from "../API";
import { useEntertainmentContext } from "../contextApi/Context";

const Authenticate = ({ isSignUp, setIsSignUp }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
    street: "",
    city: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsAuthModelOpen } = useEntertainmentContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };
  const [termsChecked, setTermsChecked] = useState(false);
  const handleLoginFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        return alert("Please fill in all fields.");
      }
      if (!isValidPassword(formData.password)) {
        return alert(
          "Password must be at least 8 characters long and include at least one special character and one number."
        );
      }
      setIsSubmitting(true);
      try {
        const { data } = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        setUser(data.user);
        setIsAuthModelOpen(false);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/myprofile");
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error ||
          error.message ||
          "Login failed. Try again.";
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, navigate]
  );
  const handleRegisterFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        !formData.email ||
        !formData.password ||
        !formData.username ||
        !formData.email
      ) {
        return alert("Please fill in all fields.");
      }
      if (!isValidPassword(formData.password)) {
        return alert(
          "Password must be at least 8 characters long and include at least one special character and one number."
        );
      }
      setIsSubmitting(true);
      try {
        await api.post("/auth/register", formData);
      } catch (error) {
        setIsSignUp(true);
      } finally {
        setIsSignUp(false);
      }
    },
    [formData, navigate]
  );
  return (
    <>
      <h3 className="mb-2 text-2xl font-semibold text-center">
        {isSignUp ? "Create your Account" : "Welcome back"}
      </h3>

      {/* Google Sign-in Button */}
      <Button
        label="Continue with Google"
        className="mx-auto w-full bg-dark-100 text-white rounded-lg py-2"
      />
      <p className="text-center my-1 text-gray-500">or</p>

      {/* Form Section */}
      <form
        onSubmit={isSignUp ? handleRegisterFormSubmit : handleLoginFormSubmit}
        className={`${isSignUp ? "grid grid-cols-2 gap-2" : ""}`}
      >
        {isSignUp && (
          <Input
            className="col-span-2"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your user name"
          />
        )}
        <Input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          required
        />

        {/* Additional fields for sign up */}
        {isSignUp && (
          <>
            <Input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            <Input
              type="text"
              onChange={handleChange}
              name="street"
              value={formData.street}
              placeholder="Enter street"
            />
            <Input
              type="text"
              onChange={handleChange}
              name="city"
              value={formData.city}
              placeholder="Enter city"
            />
            <Input
              type="text"
              onChange={handleChange}
              name="country"
              value={formData.country}
              placeholder="Enter country"
            />

            {/* Terms and Conditions Checkbox */}
            <div className="col-span-2 flex items-center mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="text-dark-100 underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </>
        )}
        {/* Forgot Password (Login only) */}
        {!isSignUp && (
          <p className="text-right mb-2 text-sm">
            <Link to="/forgot-password" className="text-dark-100 underline">
              Forgot Password?
            </Link>
          </p>
        )}

        {/* Submit Button */}
        <Button
          className="w-full col-span-2 bg-dark-100 py-2 text-white rounded-lg hover:bg-dark-100"
          label={isSignUp ? "Sign up" : "Sign in"}
          disabled={isSubmitting && isSignUp && !termsChecked}
          type="submit"
        />
      </form>

      {/* Toggle between sign up and sign in */}
      <p className="flex justify-between items-center mt-3 text-gray-700">
        {!isSignUp ? "Don't have an account?" : "Already have an account?"}
        <Link
          className="text-dark-100 underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {!isSignUp ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </>
  );
};

export default Authenticate;
