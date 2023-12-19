import { FC } from "react";
import classNames from "classnames";

import Button from "./Button";
import { TestItemProps } from "../types";

const TestItem: FC<TestItemProps> = ({
  id,
  name,
  color,
  status,
  type,
  url,
}) => {
  const statusClasses = classNames({
    "color-orange": status === "PAUSED",
    "color-red": status === "STOPPED",
    "color-green": status === "ONLINE",
  });

  const preparedType = () => {
    switch (type) {
      case "CLASSIC":
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      case "SERVER_SIDE":
        return (
          type.replace(/_/g, "-").charAt(0).toUpperCase() +
          type.slice(1).toLowerCase()
        );
      default:
        return type;
    }
  };

  const preparedStatus = () =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <tr tabIndex={0}>
      <td>
        <span style={{ backgroundColor: color }} />
        {name}
      </td>
      <td>{preparedType()}</td>
      <td className={statusClasses}>{preparedStatus()}</td>
      <td>{url}</td>
      <td>
        <Button
          isGray={status === "DRAFT"}
          route={status === "DRAFT" ? `/finalize/${id}` : `/results/${id}`}
        >
          {status === "DRAFT" ? "Finalize" : "Results"}
        </Button>
      </td>
    </tr>
  );
};

export default TestItem;
