export default function ThemeStyle() {
  let style = {
    saveButtonColor:
      "bg-[#6AB783] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg",
    addButtonColor:
      "bg-[#1A4D8C] px-4 py-2 text-white  rounded leading-5 shadow-lg hover:bg-indigo-500",
    cancelButtonColor:
      "border border-red-400 px-4 py-2 text-red-400 font-semibold rounded leading-5 shadow-lg hover:bg-red-400 hover:text-white",
    inputStyle:
      "border border-gray-400 shadow-md shadow-gray-200 rounded leading-5 px-2 py-1 h-10 ",
    labelStyle: "text-md text-gray-1000 opacity-80 ",
    headingStyle: "text-2xl text-gray-900 opacity-90 font-bold mt-4",
    titleStyle: "text-xl text-[#454646] opacity-80 font-semibold ",
    formStyle: "shadow-md shadow-gray-300 rounded-lg  bg-white  ",
    loading:
      "h-6 w-6 rounded-full animate-spin border-4 border-solid border-t-transparent",
  };

  return style;
}
