import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/features/auth/authSlice";


// Main component for the Register page

export default function LoginPage({ className, ...props }) {
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {

    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page.
    dispatch(login(inputValues))
    .unwrap()
    .then((response) => {
      console.log("Login Response:", response); // Debugging
      if (response?.success == true) {
        toast.success(response?.message , { autoClose: 2000 });
      } else {
        toast.error(response?.message , { autoClose: 2000 });
      }
    })
    .catch((error) => {
      console.error("Login Error:", error); // Debugging
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the registration form */}
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your information below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Full Name Input */}
               

                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    name="email"
                    value={inputValues.email || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Password Input */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    name="password"
                    value={inputValues.password || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <p>
                  Already have an account?
                  <Link to="/register" className="text-blue-700 underline">
                    {" "}
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
