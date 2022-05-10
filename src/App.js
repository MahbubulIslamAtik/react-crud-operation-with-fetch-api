

import { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';

const api = "https://rest-api-without-db.herokuapp.com/users/";



function App() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  //__ UPDATE //
  const [selectedData, setSelectedData] = useState({
    username: '',
    email : '',
  });
  const [updateUserFlags, setUpdateUserFlags] = useState(false);
  const [selectUserId, setSelectUserId] = useState("");

  const getAllUsers = () => {
    fetch(api).then((api) => {
      if(!api.ok){
        throw Error("Api is not found.");
      }
      return api.json();
    }).then((data) => {
      setUsers(data.users);
    }).catch((err) => {
      setError(err.message);
    }).finally(() => {
      setIsloading(false);
    })
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = (id) => {
    fetch(api + `/${id}`, {
      method : "DELETE",
    }).then((api) => {
      if(!api.ok){
        throw Error("Data not deleted.");
      }
      getAllUsers();
    }).catch((err) => {
      setError(err.message);
    })
  }

  const userData = (user) => {
    fetch(api, {
      method : "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user),
    }).then((api) => {
      if(api.status === 201){
        getAllUsers();
      }else{
        throw Error("Data is not created.");
      }
      
    }).catch((err) => {
      setError(err.message);
    })
  };

  const handleEdit = (id) => {
    setSelectUserId(id)
    setUpdateUserFlags(true);
    const filteringUpdateData = users.filter((user) => user.id === id);

    setSelectedData({
      username: filteringUpdateData[0].username,
      email: filteringUpdateData[0].email,
    })
  };

  const handleUpdate = (user) => {
    fetch(api + `/${selectUserId}`, {
      method : "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user),
    }).then((api) => {
      if(!api.ok){
        throw new Error("Data not updated.");
      }
      getAllUsers();
      setUpdateUserFlags(false);
    }).catch((err) => {
      setError(err.message);
    })
  }

  return (
    <div className="App">
      <h1>User Management App</h1>

      

      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      
      {updateUserFlags ? (<UserForm btnText="Update User" selectedData={selectedData} handleSubmitData={handleUpdate} />) : (<UserForm btnText="Add User" handleSubmitData = {userData} />)}

      <section>
        {
          users && users.map((user) => {
            const {id, username, email} = user;
            return <article className='card' key={id}>
                <h3>{username}</h3>
                <p>{email}</p>

                <button className='btn' onClick={() => {handleEdit(id)}}>Edit</button>
                <button className='btn' onClick={() => {handleDelete(id)}}>Delete</button>
              </article>
          })
        }
      </section>
    </div>
  );
}

export default App;
