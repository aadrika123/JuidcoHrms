/**
 * Author: Krish
 * Date: 02-02-2024
 * Use: For Adding data in to DB
 * status: Open
 */

import React from "react";
import InputBox from "@/components/Helpers/InputBox";
import axios from "@/lib/axiosConfig";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { Formik } from "formik";
import { useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
import goBack from "@/utils/helper";
import DropDownList from "../../Helpers/DropDownList";

//----------------- TYPES ------------------------------//
type FieldTypeProps = {
  HEADER: string;
  ACCESSOR: string;
  type: "text" | "number" | "dropdown" | "checkbox";
  uri?: string;
};

interface FormProps {
  heading: string;
  validate: {
    initialValues: object;
    formValidationSchema: object;
  };
  uri: string;
  fields: FieldTypeProps[];
  //----------------- TYPES ------------------------------//
}

//----------------- form field------------------------------//
const FormField: React.FC<
  FieldTypeProps & {
    onChange: (
      e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    name: string;
    value: string;
    error: string;
    touched: boolean;
  }
> = (props) => {
  console.log(props.error);
  switch (props.type) {
    case "number":
    case "text":
      return (
        <InputBox
          onChange={props.onChange}
          label={props.HEADER}
          name={props.ACCESSOR}
          error={props.error}
          touched={props.touched}
          value={props.value}
        />
      );
    case "dropdown":
      return (
        <>
          <DropDownList
            onChange={props.onChange}
            label={props.HEADER}
            name={props.ACCESSOR}
            error={props.error}
            touched={props.touched}
            value={props.value}
            api={props.uri || ""}
            placeholder={""}
          />
        </>
      );
    default:
      return null;
  }
};
//----------------- form field------------------------------//

// ----------------- MAIN FORM ------------------------------//
export default function Form(props: FormProps) {
  const queryClient = useQueryClient();

  // Add Details to DB
  const storeFormData = async (values: unknown): Promise<Response> => {
    const res = await axios({
      url: props.uri,
      method: "POST",
      data: values,
    });
    return res.data;
  };

  // Mutate properties
  const { mutate } = useMutation(storeFormData, {
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Successfully Added ${props.heading} Details!`);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("vendor-list");
      goBack();
    },
  });

  return (
    <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>{props.heading}</SubHeading>
      </div>
      <div className="mt-8">
        <Formik
          initialValues={props.validate.initialValues}
          validationSchema={props.validate.formValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ values, touched, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-6 gap-4">
                {props.fields?.map((field, index: number) => {
                  return (
                    <FormField
                      key={index}
                      name={field.ACCESSOR}
                      type={field.type}
                      error={errors[field.ACCESSOR as keyof typeof errors]}
                      touched={touched[field.ACCESSOR as keyof typeof touched]}
                      value={values[field.ACCESSOR as keyof typeof values]}
                      HEADER={field.HEADER}
                      ACCESSOR={field.ACCESSOR}
                      onChange={handleChange}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-end mt-5 gap-5">
                <PrimaryButton
                  buttonType="button"
                  variant={"cancel"}
                  onClick={() => {
                    goBack();
                  }}
                >
                  Back
                </PrimaryButton>

                <PrimaryButton buttonType="reset" variant={"cancel"}>
                  Reset
                </PrimaryButton>

                <PrimaryButton buttonType="submit" variant="primary">
                  Save
                </PrimaryButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}
// ----------------- MAIN FORM ------------------------------//
