import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../redux/store";
import { signInFail, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${server}/auth/google`,
        {
          username: resultsFromGoogle?.user?.displayName,
          email: resultsFromGoogle?.user?.email,
          profilePicture: resultsFromGoogle?.user?.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success == false) {
        dispatch(signInFail(data.message));
      }
      if (data.success == true) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFail(error.message));
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone={"pinkToOrange"}
      outline
      onClick={handleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      <span className="flex justify-center items-center">
        Continue with Google
      </span>
    </Button>
  );
};

export default OAuth;
