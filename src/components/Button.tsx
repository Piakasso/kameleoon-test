import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ButtonProps } from "../types";

const Button: FC<ButtonProps> = ({ children, isGray, route, handleClick }) => {
  const buttonClasses = classNames("button", {
    "background-green": !isGray,
    "background-grey": isGray,
  });
  return (
    <>
      {route ? (
        <Link to={route}>
          <button className={buttonClasses}>{children}</button>
        </Link>
      ) : (
        <button className={buttonClasses} onClick={handleClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
