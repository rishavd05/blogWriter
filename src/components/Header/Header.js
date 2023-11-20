import React from "react";

import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../Logo";
import { Link } from "react-router-dom";

function Header() {
  const loginState = useSelector((state) => state.auth.isLogged);
  const navigate = useNavigate();
  const navigateItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !loginState,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !loginState,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: loginState,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: loginState,
    },
  ]
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navigateItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {loginState && (
              <li>
                <LogoutBtn />{" "}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
