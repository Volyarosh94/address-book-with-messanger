import "./auth.css";
import avatar from "./profileimg.png";
import { ChangeEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister, uploadPic } from "../../Components/Redux/Auth/action";
import { Action } from "redux";
import { useAppDispatch, useAppSelector } from "../../Components/Redux/hooks";

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
      dispatch(uploadPic(reader.result) as unknown as Action);
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
    <div className="auth-cont">
      <div>
        <h2 className="auth-heading">Create an account</h2>
        <div>
          <div className="profile-pic">
            <input onChange={handleInputFile} type="file" name="" id="file" />
            <label htmlFor="file" id="uploadBtn">
              <img id="photo" src={user.pic ? user.pic : avatar} />
            </label>
          </div>
          <p className="profile-text">Choose Profile</p>
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
