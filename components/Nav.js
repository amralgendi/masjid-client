import Link from "next/link";
import Constants from "../constants";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      {!user ? (
        <>
          <span>
            <Link href={`http://auth.${Constants.domain}/login`}>Login</Link>
          </span>
          <span>
            <Link href={`http://auth.${Constants.domain}/register`}>
              Register
            </Link>
          </span>
        </>
      ) : (
        <>
          <span>Logged in {user.data.email}</span>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </div>
  );
};

export default Nav;
