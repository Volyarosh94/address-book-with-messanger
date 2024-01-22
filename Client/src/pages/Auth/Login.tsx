import "./auth.css";
import avatar from "./profileimg.png";
import { ChangeEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { authRegister } from "../../Components/Redux/Auth/action";
import { Action } from "redux";
import { useAppDispatch, useAppSelector } from "../../Components/Redux/hooks";

export const LoginComp = () => {
  const { user, loading, error } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [regData, setRegData] = useState({
    email: "albert@gmail.com",
    password: "albert",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = () => {
    const url = "https://messanger-br6c.onrender.com/auth/login";
    dispatch(authRegister({ url, user: regData }) as unknown as Action);
  };

  if (user._id) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 min-w-120 bg-login-bg-gray rounded-md text-login-text-gray">
      <div>
        <h2 className="text-white text-center text-3xl leading-loose">
          Welcome back!
        </h2>
        <div className="details-cont">
          <p>Email</p>
          <input name="email" onChange={handleChange} className="inputcom" />
          <p>Password</p>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="inputcom"
          />
          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}
          <p className="auth-link" onClick={handleSubmit}>
            Don't have an account? Click continue to login as guest
          </p>
          <p className="contract">
            Need an account ?
            <Link className="auth-link" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
