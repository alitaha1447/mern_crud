import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        {/* <div > */}
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/login" class="nav-link active">
              Login
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/register" class="nav-link">
              Register
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/tasks" class="nav-link">
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
