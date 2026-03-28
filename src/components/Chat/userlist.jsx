import React, { useEffect, useState } from "react";
import "./userlist.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import { createUserWithEmailAndPassword } from "firebase/auth";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Firstname"));

        const usersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Users:", usersArray); // DEBUG
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h3>Users</h3>

      {FirstName.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user.FirstName}>
            <div className="user-info">
              <p>{user.FirstName} {user.LastName}</p>
              <span>{user.email}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UsersList;