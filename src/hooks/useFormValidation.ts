import {
  useForm,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormSetValue,
  Control,
  UseFormReset,
  UseFormWatch,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  [key: string]: any;
};

type ValidationSchema<T extends FormValues> = yup.ObjectSchema<T>;

type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

type UseFormValidationReturn<T extends FormValues> = {
  register: UseFormRegister<T>;
  handleSubmit: (
    onSubmit: SubmitHandler<T>
  ) => (event?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  control: Control<any, any>;
  reset: UseFormReset<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
};

const useFormValidation = <T extends FormValues>(
  initialValues: DeepPartial<T>,
  validationSchema: ValidationSchema<T>,
  onSubmit: SubmitHandler<T>
): UseFormValidationReturn<T> => {
  const resolver = yupResolver(validationSchema);
  const defaultValues: any = initialValues;
  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors
  } = useForm({
      mode: "onChange",
    resolver,
    defaultValues,
  });

  const handleFormSubmit: any = handleSubmit(onSubmit);

  return {
    control,
    register,
    getValues,
    setValue,
    handleSubmit: handleFormSubmit,
    errors,
    reset,
    watch,
    setError,
    clearErrors
  };
};

export default useFormValidation;
