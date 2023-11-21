import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import authService from "../AppWrite/auth_service";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Logo from "./Logo";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const createAccount = async (data) => {
    setLoading(true);
    setError("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const user = await authService.getCurrentUser();
        if (user) dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>{ loading &&
        <div
          className="flex justify-center items-center h-screen"
          style={{
            top: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: "1",
          }}
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(createAccount)}>
            <div className="space-y-5">
              <Input
                lable="Full Name: "
                placeholder="Enter your full name"
                {...register("name", { required: true })}
              />
              <Input
                lable="Email: "
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                lable="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />

              <Button type="submit" className="w-full">
                {" "}
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
