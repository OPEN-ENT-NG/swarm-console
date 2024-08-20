import { Session } from "@/types";

import { DisplayModalsState } from "./types";

export const initialDisplayModalsState: DisplayModalsState = {
  createServices: false,
};

export const prepareUser = (session: Session) => {
  const {
    user: { name, email, image },
    token,
  } = session;
  return { name, email, image: image || "", token };
};