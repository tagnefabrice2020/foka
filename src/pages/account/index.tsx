import React from "react";
import { Router } from "@reach/router";
import { graphql } from "gatsby";
import GuestRoute from "../../components/guestRoute";
import Question from "../../components/pages/quiz";
import Login from "../../components/pages/login";
import Register from "../../components/pages/register";
import { AuthContextProvider } from "../../context/AuthContext";
import PrivateRoute from "../../components/privateRoute";
import { PageContextProvider } from "../../context/PageContext";

const Account = () => {
  return (
    <AuthContextProvider>
      <PageContextProvider>
        <Router basepath="/account">
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <PrivateRoute path="/questions" component={Question} />
        </Router>
        <Router basepath="/:lang/account">
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <PrivateRoute path="/questions" component={Question} />
        </Router>
      </PageContextProvider>
    </AuthContextProvider>
  );
};

export default Account;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
