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
    size?: any,
    setState?: any
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = (props) => {
    // const [, , helpers] = useField(props.name);
    const { setFieldValue, handleBlur } = useFormikContext();

    return (
        <div className="flex flex-col gap-1">
            <label className="text-secondary text-sm">
                {props.label}
                {props.required && <span className="text-red-500">*</span>}
            </label>
            <Autocomplete
                options={props.options}
                getOptionLabel={props.getOptionLabel}
                // value={props?.value}
                onChange={(event, value) => { setFieldValue(props.name, value?.state || ""); props?.setState(value?.state) }}
                onBlur={() => handleBlur({ target: { name: props.name } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={props.placeholder}
                        // error={Boolean(props.touched && props.error)}
                        // helperText={props.touched && props.error}
                        name={props.name}
                        disabled={props.disabled}
                    // className={props.className}
                    />
                )}
                size={props?.size || 'small'}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            {props.touched && props.error && (
                <div className="text-red-500">{props.error}</div>
            )}
        </div>
    );
};

export default AutocompleteField;
