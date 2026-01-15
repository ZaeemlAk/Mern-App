import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  console.log("admin layout", user);

  // 1️⃣ Wait until auth finishes
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // 2️⃣ User not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 3️⃣ User logged in but not admin
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  // 4️⃣ Admin user
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contacts
                </NavLink>
              </li>

              <li>
                <NavLink to="/service">
                  <FaRegListAlt /> Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  );
};
