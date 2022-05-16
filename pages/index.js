import React from "react";

import { Center, Text } from "native-base";

import Loader from "../components/Loader";

export default function ComponentName() {
  return (
    <Center flex={1}>
      <Loader show />
    </Center>
  );
}
