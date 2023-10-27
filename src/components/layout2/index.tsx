import React from "react";
import "./../../app.css";
import Header from "../header";
import Footer from "../footer";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../../context/AuthContext";

type Prop = {
  children: React.ReactNode;
};

const Layout2 = ({ children }: Prop) => {
  return (
    <AuthContextProvider>
      <>
        <Header />

        {children}
        <div>
          <Toaster />
        </div>
        <Footer />
      </>
    </AuthContextProvider>
  );
};

export default Layout2;
