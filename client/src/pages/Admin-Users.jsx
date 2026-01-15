import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const { authorizationToken, API } = useAuth();

  // ===============================
  // GET ALL USERS (ADMIN)
  // ===============================
  const getAllUsersData = useCallback(async () => {
    // ⛔ prevent API call until token is ready
    if (!authorizationToken) return;

    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Fetch users failed:", text);
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [API, authorizationToken]);

  // ===============================
  // DELETE USER (ADMIN)
  // ===============================
  const deleteUser = async (id) => {
    if (!authorizationToken) return;

    try {
      const response = await fetch(
        `${API}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Delete failed:", text);
        return;
      }

      await response.json();
      getAllUsersData(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ===============================
  // LOAD USERS WHEN TOKEN READY
  // ===============================
  useEffect(() => {
    if (authorizationToken) {
      getAllUsersData();
    }
  }, [authorizationToken, getAllUsersData]);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>

      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              users.map((curUser) => (
                <tr key={curUser._id}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td>
                    <Link to={`/admin/users/${curUser._id}/edit`}>
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => deleteUser(curUser._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
