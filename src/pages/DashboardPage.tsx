import { useEffect, useState } from "react";
import TitlePage from "../components/TitlePage";
import FilterField from "../components/FilterField";
import TestList from "../components/TestList";
import { useHttp } from "../hooks/useHttp";

import { Site, Test, TestItemProps } from "../types";

const DashboardPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [tests, setTests] = useState<TestItemProps[]>([]);
  const [sortMethod, setSortMethod] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const { request } = useHttp();

  useEffect(() => {
    Promise.all([request("tests"), request("sites")])
      .then(([tests, sites]: [Test[], Site[]]) => {
        const updatedSites = sites.map((item) => {
          return {
            ...item,
            color: `rgb(${Math.round(Math.random() * 256)},${Math.round(
              Math.random() * 256
            )},${Math.round(Math.random() * 256)},0.3)`,
          };
        });

        const updatedTestList = tests.map((test) => {
          const matchSite = updatedSites.find(
            (site) => test.siteId === site.id
          );

          const preparedSite = () => {
            if (matchSite!.url.includes("https://www.")) {
              return matchSite!.url.replace("https://www.", "");
            }
            if (matchSite!.url.includes("http://")) {
              return matchSite!.url.replace("http://", "");
            }
            if (matchSite!.url.includes("https://")) {
              return matchSite!.url.replace("https://", "");
            }

            return "";
          };

          return {
            ...test,
            color: matchSite!.color,
            url: preparedSite(),
          };
        });
        setTests(updatedTestList);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleResetButton = () => {
    setInputValue("");
    setSortMethod("name");
    setSortDirection("asc");
  };

  const handleInputValue = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleSort = (method: string) => {
    if (sortMethod === method) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortMethod(method);
      setSortDirection("asc");
    }
  };

  const filteredTest = tests.filter((test) =>
    test.name.toLowerCase().includes(inputValue)
  );

  const sortedAndFilteredTests = filteredTest.slice().sort((a, b) => {
    switch (sortMethod) {
      case "name":
        return sortDirection === "asc"
          ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          : b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      case "type":
        return sortDirection === "asc"
          ? a.type.toLowerCase().localeCompare(b.type.toLowerCase())
          : b.type.toLowerCase().localeCompare(a.type.toLowerCase());
      case "site":
        return sortDirection === "asc"
          ? a.url.toLowerCase().localeCompare(b.url.toLowerCase())
          : b.url.toLowerCase().localeCompare(a.url.toLowerCase());
      case "status":
        const statusOrder = ["DRAFT", "STOPPED", "PAUSED", "ONLINE"];
        const statusCompare = (statusA: string, statusB: string) => {
          return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
        };

        return sortDirection === "asc"
          ? statusCompare(a.status, b.status)
          : statusCompare(b.status, a.status);
      default:
        return 0;
    }
  });

  return (
    <div className="dashboard-page">
      <TitlePage>Dashboard</TitlePage>
      <FilterField
        inputValue={inputValue}
        handleInputValue={handleInputValue}
        test={filteredTest.length}
      />
      <TestList
        tests={sortedAndFilteredTests}
        handleSort={handleSort}
        sortMethod={sortMethod}
        sortDirection={sortDirection}
        handleResetButton={handleResetButton}
      />
    </div>
  );
};

export default DashboardPage;
