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

// Main component for the Register page

export default function RegisterPage({ className, ...props }) {
  const [inputValues, setInputValues] = useState({});
  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    axios
      .post("http://localhost:8080/users/register", inputValues, {
        headers: { "Content-Type": "application/json" }, // Fix header case (should be lowercase 'application/json')
     
      })
      .then((response) => {
        toast.success(response?.data?.message, {autoClose:2000}); // Handle success (e.g., navigate to another page or show success message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error.response.data ,{autoClose:2000}); // Handle error (e.g., show error message)
        console.log(error.response)
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the registration form */}
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Full Name Input */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name here"
                    required
                    name="name"
                    value={inputValues.name || ""}
                    onChange={handleChange}
                  />
                </div>

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
                  <Link to="/login" className="text-blue-700 underline">
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