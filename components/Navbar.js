import React from "react";
import { Avatar, Box, HStack, Pressable, Text } from "native-base";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.authState.user);
  const username = useSelector((state) => state.authState.username);

  return (
    <HStack
      bg="black"
      py={[5]}
      px={[5, 10]}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box px={5} py={3} bg="blue.400" rounded="md">
        <Link href="/">
          <Text color="white">Feed</Text>
        </Link>
      </Box>

      {/* user available */}
      {username && (
        <HStack space={5}>
          <Box px={5} py={3} bg="blue.400" rounded="md">
            <Link href="/admin">
              <Text color="white">Write Posts</Text>
            </Link>
          </Box>

          <Link href={`/${username}`}>
            <Avatar source={{ uri: user?.photoURL }} bg="emerald.400">
              <Text color="white">{username[0]?.toUpperCase()}</Text>
            </Avatar>
          </Link>
        </HStack>
      )}

      {/* user not available */}
      {!username && (
        <Link href="/enter">
          <Box px={5} py={3} bg="green.400" rounded="md">
            <Text color="white">LOG IN</Text>
          </Box>
        </Link>
      )}
    </HStack>
  );
}
