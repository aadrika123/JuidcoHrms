import React from "react";
import TextArea from "@/components/global/atoms/Textarea";
import RadioButtons from "@/components/global/atoms/RadioButton";
import CheckBoxes from "@/components/global/atoms/Checkbox";
import Input from "../atoms/Input";
import Select from "../atoms/Select";


/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Controller
 * | Status- done
 */

interface Options {
  key: string,
  value: string
}

interface FormikControllerProps {
  control: string;
  label: string;
  name: string;
  options: Options[];
  placeholder?: string | "";
  api?: string;
  type?: string;
  value?: number | string;
  error?: string | undefined;
  touched?: boolean | undefined;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormikController: React.FC<FormikControllerProps> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBoxes {...rest} />;
    case "select":
      return <Select {...rest} />;
    default:
      return null;
  }
};

export default FormikController;
