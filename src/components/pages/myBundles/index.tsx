import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import DashboardLayout from "../../dashboadLayout";
import QuizPageHeader from "../../quizPageHeader";
import { Controller } from "react-hook-form";
import { Input } from "../../input";
import ErrorFormMessage from "../../errors/formMessage";
import useFormValidation from "../../../hooks/useFormValidation";
import { mixed, number, object, string } from "yup";
import { Button } from "../../button";
import { Select } from "../../select";

const MyBundles = () => {
  const initialValues: {
    name: string;
    currency: "USD" | "XAF" | null;
    price: number | null;
  } = {
    name: "",
    currency: null,
    price: null,
  };

  const BundleSchema = object({
    name: string().required(),
    price: number().default(null).nullable(),
    currency: string().oneOf(["USD", "XAF"], "Invalid").nullable(),
  });

  const handleOnSubmit = (formData: any) => {};

  const {
    control,
    errors,
    getValues,
    setValue,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
  } = useFormValidation(initialValues, BundleSchema, handleOnSubmit);

  return (
    <DashboardLayout>
      <div>
        <QuizPageHeader questionNumber="1" questionType="New Bundle" />
        <div
          style={{
            padding: "1rem",
            maxWidth: "clamp(59vw, 80vw, 90vw)",
            margin: "auto",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "1.5rem",
            }}
          >
            <div>
              <Typography
                style={{ color: "rgb(101, 109, 118)" }}
                variant="caption"
              >
                Description
              </Typography>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, name } }) => (
                  <Input
                    placeholder="Description"
                    name={name}
                    onChange={onChange}
                    value={getValues().name}
                  />
                )}
              />
              {errors.name && (
                <ErrorFormMessage message={errors.name.message} />
              )}
            </div>

            <div>
              <Typography
                style={{ color: "rgb(101, 109, 118)" }}
                variant="caption"
              >
                Currency
              </Typography>
              <Controller
                name="currency"
                control={control}
                render={({ field: { onChange, name } }) => (
                  <Select
                    placeholder="Currency"
                    name={name}
                    onChange={onChange}
                    value={getValues().name}
                  >
                    <option value={`XAF`}>XAF</option>
                    <option value={`USD`}>USD</option>
                  </Select>
                )}
              />
              {errors.currency && (
                <ErrorFormMessage message={errors.currency.message} />
              )}
            </div>

            <div>
              <Typography
                style={{ color: "rgb(101, 109, 118)" }}
                variant="caption"
              >
                Price
              </Typography>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, name } }) => (
                  <Input
                    placeholder="Price"
                    name={name}
                    onChange={onChange}
                    value={getValues().name}
                  />
                )}
              />
              {errors.price && (
                <ErrorFormMessage message={errors.price.message} />
              )}
            </div>

            <div>
              <Divider />
              <div
                style={{
                  width: "500px",
                  minWidth: "320px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  columnGap: "0.5rem",
                  marginTop: "2rem",
                }}
              >
                <Button $primary type="submit">
                  Save
                </Button>
                <Button $secondary onClick={() => reset()}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyBundles;
