import React from "react";

interface InputBoxProps {
  label: React.ReactNode;
  value?: string | number;
}

const FilledDisabledInputBox: React.FC<InputBoxProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm"  htmlFor="browser">{props.label}</label>
        <input disabled value={props.value} className="text-primary p-3 rounded-lg border bg-transparent border-zinc-400" list="browsers" name="browser" id="browser" />
      </div>
    </>
  );
};

export default FilledDisabledInputBox;
