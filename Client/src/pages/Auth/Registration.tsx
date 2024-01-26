import { ChangeEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Action } from "redux";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { authRegister, uploadPic } from "../../Components/Redux/Auth/action";
import { useAppDispatch, useAppSelector } from "../../Components/Redux/hooks";
import Avatar from "./profileimg.png";
import "./auth.css";

export const RegisterComp = () => {
  const { user, loading, error } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [regData, setRegData] = useState({
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isAdmin: false,
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleInputFile = async (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    // const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(uploadPic(reader.result as string) as unknown as Action);
      // setPic(reader.result);
    };
    const fileUrl = URL.createObjectURL(file as Blob);
    const fileResponse = await fetch(fileUrl);
    const fileBlob = await fileResponse.blob();
    reader.readAsDataURL(fileBlob);
  };

  const handleSubmit = () => {
    const url = "https://messanger-br6c.onrender.com/auth";
    if (user.pic) regData["pic"] = user.pic;
    dispatch(authRegister({ url, user: regData }) as unknown as Action);
  };

  if (user._id) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 min-w-120 bg-login-bg-gray rounded-md text-login-text-gray">
      <div>
        <h2 className="text-white text-center text-3xl leading-loose">
          Create an account
        </h2>
        <div>
          <div className="relative rounded-full overflow-hidden w-[23%] m-auto">
            <input
              onChange={handleInputFile}
              type="file"
              name=""
              id="file"
              className="hidden"
            />
            <label htmlFor="file" id="uploadBtn">
              <img
                id="photo"
                src={user.pic ? user.pic : Avatar}
                className="rounded-full w-[110px] h-[110px] cursor-pointer"
              />
            </label>
          </div>
          <p className="text-center mt-0">Choose Profile</p>
        </div>
        <div className="details-cont">
          <p>Name</p>
          <input onChange={handleChange} name="name" className="inputcom" />
          <p>Email</p>
          <input onChange={handleChange} name="email" className="inputcom" />
          <p>Password</p>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="inputcom"
          />
          <p>Confirm Password</p>
          <input type="password" className="inputcom" />
          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}
          <Link className="auth-link" to={"/login"}>
            Already have an account
          </Link>
          <p className="contract">
            By registering you agree to Messenger's{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
