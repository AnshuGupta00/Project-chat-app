import React, { useEffect, useState } from "react";
import "./userlist.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import { createUserWithEmailAndPassword } from "firebase/auth";

function UsersList() {
  const [User, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Firstname"));

        const usersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Users:", UserArray); // DEBUG
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

      {User.length === 0 ? (
        <p>No users found</p>
      ) : (
        User.map((User) => (
          <div className="user-card" key={user.id}>
            <div className="user-info">``
              <p>{User.firstName} {User.lastName}</p>
              <span>{User.email}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UsersList;