import { Outlet } from "react-router-dom";
import GlobalStyles from "../my-styled-components/GlobalStyles";
import Header from "../components/Header";
export default function MainLayout() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
    </>
  );
}
