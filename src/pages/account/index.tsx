import React from "react";
import { Router } from "@reach/router";
import { graphql } from "gatsby";
import GuestRoute from "../../components/guestRoute";
import Question from "../../components/pages/quiz";

const Account = () => {
  return (
    <>
      <Router basepath="/account">
        <GuestRoute path="/questions" component={Question} />
      </Router>
      <Router basepath="/:lang/account">
        <GuestRoute path="/questions" component={Question} />
      </Router>
    </>
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
