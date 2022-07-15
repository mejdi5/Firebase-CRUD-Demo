import React, {useState, useEffect} from 'react'
import './App.css';
import { db } from "./firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const App = () => {

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const usersCollection = collection(db, "users");
  const [users, setUsers] = useState([]);

  const createUser = async () => {
    await addDoc(usersCollection, { name: newName, age: Number(newAge) });
  };

  const IncreaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const DecreaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age - 1 };
    newFields.age >= 10 &&
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({id: doc.id, ...doc.data()})));
    };
    getUsers();
  }, [users])
  

return (
    <div>
        <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button onClick={createUser}>Add User</button>
      {users.map((user) => {
        return (
          <div key={user?.id}>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                IncreaseAge(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                DecreaseAge(user.id, user.age);
              }}
            >
              {" "}
              Decrease Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
)}

export default App;
