import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface TitlePageProps extends ChildrenProps {}

export enum Type {
  CLASSIC = "CLASSIC",
  SERVER_SIDE = "SERVER_SIDE",
  MVT = "MVT",
}

enum Status {
  DRAFT = "DRAFT",
  ONLINE = "ONLINE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface Site {
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}

export interface ButtonProps {
  children: ReactNode;
  isGray: boolean;
  route?: string;
  handleClick?: () => void;
}

export interface FilterFieldProps {
  handleInputValue: (e: string) => void;
  test: number;
  inputValue: string;
}

export interface TestListProps {
  tests: TestItemProps[];
  handleSort: (item: string) => void;
  sortDirection: string;
  sortMethod: string;
  handleResetButton: () => void;
}

export interface TestItemProps extends Test {
  url: string;
  color: string;
}
