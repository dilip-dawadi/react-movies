import React, { useState } from "react";
import { Button } from "./reuse/Button";
import { Input } from "./reuse/Input";
import { Link } from "react-router-dom";

const Authenticate = ({ isSignUp, setIsSignUp }) => {
  const [termsChecked, setTermsChecked] = useState(false);

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
      <form className={`${isSignUp ? "grid grid-cols-2 gap-2" : ""}`}>
        <Input type="email" placeholder="Enter email" />
        <Input type="password" placeholder="Enter password" />

        {/* Additional fields for sign up */}
        {isSignUp && (
          <>
            <Input type="number" placeholder="Enter phone number" />
            <Input type="text" placeholder="Enter street" />
            <Input type="text" placeholder="Enter city" />
            <Input type="text" placeholder="Enter country" />

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
          disabled={isSignUp && !termsChecked}
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
