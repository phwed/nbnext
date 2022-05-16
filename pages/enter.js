import React from "react";
import {
  Center,
  Pressable,
  Box,
  Text,
  Button,
  Image,
  useToast,
  Heading,
  FormControl,
  Input,
  Avatar,
} from "native-base";
import debounce from "lodash.debounce";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUsername, clearUser } from "../redux/slices/authSlice";
import {
  setUserMiddleware,
  setPreferedUsernameMiddleware,
  checkExistingUsernameMiddleware,
} from "../redux/middlewares/authMiddleware";

// firebase
import { db, auth } from "../lib/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Enter({}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authState.user);
  const username = useSelector((state) => state.authState.username);

  const provider = new GoogleAuthProvider();

  return (
    <Center flex={1}>
      {user ? !username ? <UsernameForm /> : <ProfilePage /> : <SignInButton />}
    </Center>
  );
}

// sign in with google function
function SignInButton() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const toast = useToast();

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.authState.loginLoading);

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          dispatch(setUserMiddleware(result.user));
        })
        .catch((error) => {
          console.log(error);
          toast.show({
            title: "Error",
            description: error.code,
            status: "error",
            placement: "top",
          });
        });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Error",
        description: error.message,
        status: "error",
        placement: "top",
      });
    }
  };

  return (
    <Button
      onPress={signInWithGoogle}
      isLoading={loading}
      _loadingText="Signing in..."
      leftIcon={
        <Image
          size="xs"
          rounded="full"
          src={
            "data:image/jpeg;base64,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"
          }
        />
      }
    >
      SIGN IN WITH GOOGLE
    </Button>
  );
}

// sing out button
function ProfilePage() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const toast = useToast();

  const user = useSelector((state) => state.authState.user);
  const username = useSelector((state) => state.authState.username);

  return (
    <Center flex={1}>
      <Avatar size={"2xl"} source={{ uri: user?.photoURL }}>
        <Text>{username[0]?.toUpperCase()}</Text>
      </Avatar>

      <Text mt={2}>@{username}</Text>

      <Heading fontSize="4xl">{user.displayName}</Heading>

      <Button
        mt={5}
        onPress={() =>
          auth
            .signOut()
            .then(() => {
              toast.show({
                title: "Signed out successfully",
                duration: 3000,
                status: "success",
                placement: "top",
              });
              dispatch(clearUser());
            })
            .catch((error) => {
              console.log(error);
              toast.show({
                title: "Error",
                description: error.message,
                status: "error",
                placement: "top",
              });
            })
        }
      >
        Sign out
      </Button>
    </Center>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);

  const user = useSelector((state) => state.authState.user);
  const username = useSelector((state) => state.authState.username);

  const dispatch = useDispatch();

  React.useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (val) => {
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val.toLowerCase())) {
      setFormValue(val.toLowerCase());
      setLoading(true);
      setIsValid(false);

      console.log("valid");
    }
  };

  const checkUsername = React.useCallback(
    debounce(async (username) => {
      if (username.length > 3) {
        const docRef = doc(db, "usernames", username);
        const docSnap = await getDoc(docRef);
        setIsValid(docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <Center w="100%">
      <Box w="80%">
        <Heading fontSize="4xl">Choose Username</Heading>

        <Box mt={5}>
          <Input
            variant={"filled"}
            bg="blue.200"
            placeholder="my username"
            fontSize={"xl"}
            value={formValue}
            onChangeText={onChange}
          />
        </Box>

        <Box my={5}>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
        </Box>

        <Button
          onPress={() =>
            dispatch(setPreferedUsernameMiddleware(formValue, user.uid))
          }
        >
          CHOOSE
        </Button>

        <Text mt={10}>Debug State</Text>
        <Text>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </Text>
      </Box>
    </Center>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Text fontSize="lg">Checking...</Text>;
  } else if (!isValid) {
    return (
      <Text color="success.500" fontSize="lg">
        {username} is available!
      </Text>
    );
  } else if (username && isValid) {
    return (
      <Text color="error.500" fontSize="lg">
        That username is taken!
      </Text>
    );
  } else {
    return <p></p>;
  }
}
