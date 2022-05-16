import { Spinner } from "native-base";
import React from "react";

// Loading Spinner
export default function Loader({ show }) {
  return show ? <Spinner size="lg" /> : null;
}
