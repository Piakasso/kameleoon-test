import { FC } from "react";
import TestItem from "./TestItem";

import { TestListProps } from "../types";
import Button from "./Button";

const headers = ["name", "type", "status", "site"];

const TestList: FC<TestListProps> = ({
  tests,
  handleSort,
  sortDirection,
  sortMethod,
  handleResetButton,
}) => {
  return (
    <div className="dashboard-list-container">
      {tests.length > 0 ? (
        <table className="dashboard-list">
          <thead>
            <tr>
              {headers.map((item) => (
                <th
                  key={item}
                  colSpan={item === "SITE" ? 2 : 1}
                  onClick={() => {
                    handleSort(item);
                  }}
                  tabIndex={0}
                >
                  <div>
                    {item}
                    {sortMethod === item && (
                      <svg
                        style={{
                          transform:
                            sortDirection === "asc" ? "rotate(180deg)" : "",
                        }}
                        width="7"
                        height="4"
                        viewBox="0 0 7 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 3.50001L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.50001L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.50001Z"
                          fill="#999999"
                        />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tests.map((item) => (
              <TestItem key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="not-match">
          <p>Your search did not match any results.</p>
          <Button isGray={false} handleClick={handleResetButton}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestList;
