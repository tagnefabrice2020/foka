import React, { FormEventHandler } from "react";
import styled from "styled-components";
import { Input } from "../../input";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";
import useFormValidation from "../../../hooks/useFormValidation";
import { LoginSchema, LoginType } from "../../../formSchema/login";
import { Controller } from "react-hook-form";
import ErrorFormMessage from "../../errors/formMessage";
import useLogin from "../../../hooks/useLogin";
import { useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../../layout";
import Loader from "../../loader";

const Login = () => {
  const { t } = useTranslation();
  const initialValue = {
    email: "",
    password: "",
  };

  const onLogin = (formData: LoginType) => {
    login(formData);
  };

  const { errors, control, handleSubmit } = useFormValidation(
    initialValue,
    LoginSchema,
    onLogin
  );

  const { isPending, error, login } = useLogin();

  const { navigate } = useI18next();

  return (
    <Layout>
      <PageContainer>
        <BoxContainer>
          <div>
            <BoxContent>
              <Title>FOKA</Title>
              <SubTitle>{t("signIn")}</SubTitle>
              <Link onClick={() => navigate("/account/register")}>
                {t("noAccount")}
              </Link>
              {error.length > 0 && <ErrorFormMessage message={error} />}
              <div>
                <FormContainer
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    handleSubmit(onLogin);
                  }}
                >
                  <div>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, name } }) => (
                        <Input
                          type="email"
                          className={errors.email ? "error" : ""}
                          name={name}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors.email && (
                      <ErrorFormMessage message={errors.email.message} />
                    )}
                    <Description>{t("secureMail")}</Description>
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, name } }) => (
                        <Input
                          type="password"
                          className={errors.email ? "error" : ""}
                          name={name}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors.password && (
                      <ErrorFormMessage message={errors.password.message} />
                    )}
                    <Description>Click here to Reset password</Description>
                  </div>
                  <ButtonContainer>
                    <Button
                      type="submit"
                      style={{
                        width: "100%",
                      }}
                    >
                      {isPending && "loading"}
                      {!isPending && t("login")}
                    </Button>
                    <OrTitle>{t("or")}</OrTitle>
                  </ButtonContainer>
                </FormContainer>
                <ButtonContainer>
                  <Button
                    type="button"
                    style={{
                      width: "100%",
                    }}
                  >
                    <i className="bi bi-google"></i> {t("googleSign")}
                  </Button>
                </ButtonContainer>
              </div>
            </BoxContent>
          </div>
          <ImageContainer>
            {/* <Image src={LoginBanner} alt="Login Banner" /> */}
          </ImageContainer>
        </BoxContainer>
      </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 5.625rem);
  position: relative;

  @media screen and (max-width: 868px) {
    top: 5.625rem;
  }
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  min-width: 0;
  max-width: 1000px;
  row-gap: 2rem;
`;

const BoxContent = styled.div`
  max-width: 300px;
  margin: auto;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2rem;
`;

const SubTitle = styled.h1`
  font-weight: 700;
`;

const Link = styled.h6`
  font-weight: 300;
  cursor: pointer;
  text-decoration: underline;
  &:hover: {
    font-weight: 600;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
`;

const Description = styled.h6`
  font-size: small;
  cursor: pointer;
  margin-top: 0.4rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const OrTitle = styled.h6`
  font-weight: 700;
  text-align: center;
`;

const GoogleButton = styled.button`
  /* Styles for Google button */
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 300px;
  width: auto;
  justify-content: center;
`;

const Image = styled.img`
  height: 400px;
  width: auto;
`;

export default Login;
