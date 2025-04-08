import React from "react";
import { useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";

interface AutocompleteFieldProps {
    label?: React.ReactNode;
    name: string;
    placeholder: string;
    options: Array<{ state: string }>;
    getOptionLabel: (option: any) => string;
    error?: string | undefined;
    touched?: boolean | undefined;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    size?: any;
    setState?: (value: string) => void;
    value?: string;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = (props) => {
    const { setFieldValue, handleBlur, values } = useFormikContext<any>();

    return (
        <div className="flex flex-col gap-1">
            <label className="text-secondary text-sm">
                {props.label}
                {props.required && <span className="text-red-500">*</span>}
            </label>
            <Autocomplete
                options={props.options}
                getOptionLabel={props.getOptionLabel}
                value={
                    props.options.find((option) => option.state === values[props.name]) || null
                }
                onChange={(event, value) => { 
                    setFieldValue(props.name, value?.state || ""); 
                    props.setState?.(value?.state || "");
                }}
                onBlur={() => handleBlur({ target: { name: props.name } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={props.placeholder}
                        error={Boolean(props.touched && props.error)}
                        helperText={props.touched && props.error}
                        name={props.name}
                        disabled={props.disabled}
                    />
                )}
                size={props.size || "small"}
            />
        </div>
    );
};

export default AutocompleteField;
