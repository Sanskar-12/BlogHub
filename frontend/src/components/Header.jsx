import { Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import axios from "axios";
import { server } from "../redux/store";
import { signOutFail, signOutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const [search, setSearch] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleSignOut = async () => {
    try {
      const res = await axios.post(`${server}/auth/signout`);

      if (res.success === false) {
        dispatch(signOutFail(res.message));
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFail(error.message));
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Blog
        </span>
        Hub
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-1/2 h-10 hidden sm:inline"
          color={"gray"}
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser?.user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              currentUser?.user?.profilePicture && (
                <img
                  src={currentUser?.user?.profilePicture}
                  alt="User Image"
                  className="rounded-full h-10 w-10"
                />
              )
            }
          >
            <Dropdown.Header>
              <span className="block text-sm p-1">
                @{currentUser?.user?.username}
              </span>
              <span className="block text-sm font-bold truncate pl-1">
                {currentUser?.user?.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone={"purpleToBlue"} outline>
              SignIn
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
