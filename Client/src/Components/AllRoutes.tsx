import { Navigate, Route, Routes } from "react-router-dom";
import { LoginComp } from "../pages/Auth/Login";
import { RegisterComp } from "../pages/Auth/Registration";
import { HomeComp } from "../pages/Home";
import { Contacts } from "../pages/Contacts";
import { ContactInfo } from "../pages/ContactInfo";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeComp />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contact-info" element={<ContactInfo />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
