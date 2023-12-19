import { FC } from "react";
import { TitlePageProps } from "../types";

const TitlePage: FC<TitlePageProps> = ({ children }) => {
  return <h1 className="main-title">{children}</h1>;
};

export default TitlePage;
