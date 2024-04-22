import Cookies from "js-cookie";
const setHeader = () => {
  const Auth = Cookies.get("accesstoken");
  const t0k3n = `Bearer ${Auth}`;
  return t0k3n;
};

export default setHeader;
