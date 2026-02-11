 import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: 12 }}>
      <Link to="/">Home</Link>
      {user && <Link to="/create">Create</Link>}
      {user && <Link to="/me">My Posts</Link>}
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
