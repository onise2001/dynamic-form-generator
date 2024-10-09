import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../contexts/MainContext";
import {
  FormContainer,
  OrangeButton,
  RadioLabel,
  RadioWrapper,
  SingleInputWrapper,
  StyledForm,
  StyledInput,
  StyledLabel,
  Title,
} from "../my-styled-components/GlobalStyles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

export default function ShowForm() {
  const { myForms } = useMainContext();
  const { id } = useParams();

  const [form, setForm] = useState<FormType>();
  useEffect(() => {
    if (id) {
      setForm(myForms.find((item) => item.id === parseInt(id)));
    }
  }, []);

  const [schema, setSchema] = useState<
    yup.ObjectSchema<Record<string, yup.AnySchema>>
  >(yup.object().shape({}));

  useEffect(() => {
    if (form) {
      const shape: Record<string, yup.AnySchema> = {};
      if (form) {
        form.inputs.forEach((input) => {
          let schema;

          if (input.type === "number") {
            schema = yup.number();

            if (Number(input.validations.min) > 0) {
              schema = schema.min(
                Number(input.validations?.min),
                `Minimum number is ${input.validations.min}`
              );
            }
            if (Number(input.validations.max) > 0) {
              schema = schema.max(
                Number(input.validations.max),
                `Maximum number is ${input.validations.max}`
              );
            }

            if (input.validations.required) {
              schema = schema.required(`${input.label} is required`);
            }

            shape[input.label] = schema;
          } else if (["", "text", "email", "password"].includes(input.type)) {
            schema = yup.string();

            if (input.validations.required) {
              schema = schema.required(`${input.label} is required`);
            }

            if (Number(input.validations.minLength) > 0) {
              schema = schema.min(
                Number(input.validations.minLength),
                `Minimum length of ${input.label} is ${input.validations.minLength}`
              );
              console.log(schema);
            }
            if (Number(input.validations.maxLength) > 0) {
              schema = schema.max(
                Number(input.validations.maxLength),
                `Maximum length of ${input.label} is ${input.validations.maxLength}`
              );
            }
            if (input.validations.regex) {
              const regex = new RegExp(input.validations.regex);
              schema = schema.test("regex", "Invalid Value", (value) =>
                value ? regex.test(value) : true
              );
            }
            shape[input.label] = schema;
          } else if (input.type === "radio" || input.type === "dropdown") {
            schema = yup.string();
            if (input.validations.required) {
              schema = schema.required(`${input.label} is required`);
            }
            shape[input.label] = schema;
          }
        });
      }
      setSchema(yup.object().shape(shape));
    }
  }, [form]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  type formDataType = yup.InferType<typeof schema>;

  const onSubmit: SubmitHandler<formDataType> = (data) => console.log(data);

  console.log(errors);
  return (
    <FormContainer>
      {form ? (
        <StyledForm $height={form.height} onSubmit={handleSubmit(onSubmit)}>
          <Title>{form.title}</Title>
          {form?.inputs?.map((item) => (
            <SingleInputWrapper
              $draggable={false}
              top={item.position?.y}
              left={item.position?.x}
              key={Math.random()}
            >
              {item.type === "submit" ? (
                <OrangeButton>{item.text}</OrangeButton>
              ) : item.type === "dropdown" ? (
                <Controller
                  name={item.label}
                  control={control}
                  defaultValue={
                    item.options ? (item.options[0]?.value as string | any) : ""
                  }
                  render={({ field }) => (
                    <select
                      {...field}
                      value={(field.value as string | any) || ""}
                    >
                      {item.options?.map((option) => (
                        <option value={option.value} key={Math.random()}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              ) : item.type === "radio" ? (
                <Controller
                  name={item.label}
                  control={control}
                  defaultValue={
                    item.options ? (item.options[0]?.value as string | any) : ""
                  }
                  render={({ field }) => (
                    <>
                      {item.radioOptions?.map((option) => (
                        <RadioWrapper key={Math.random()}>
                          <input
                            {...field}
                            type="radio"
                            value={option.value}
                            id={option.value}
                          />
                          <RadioLabel htmlFor={option.value}>
                            {option.label}
                          </RadioLabel>
                        </RadioWrapper>
                      ))}
                    </>
                  )}
                />
              ) : (
                <>
                  <StyledLabel>{item.label}</StyledLabel>
                  <StyledInput
                    type={item.type}
                    placeholder={item.placeholder}
                    {...register(item.label)}
                  />
                  {errors[item.label] ? (
                    <ErrorSpan>
                      {errors[item.label]?.message as string}
                    </ErrorSpan>
                  ) : null}
                </>
              )}
            </SingleInputWrapper>
          ))}
        </StyledForm>
      ) : null}
    </FormContainer>
  );
}

const ErrorSpan = styled.span`
  font-size: 1.2rem;
  color: red;
`;
