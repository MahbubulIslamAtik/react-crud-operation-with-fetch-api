import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const UserForm = ({handleSubmitData, selectedData, btnText}) => {
   const [user, setUser] = useState({
      username: "",
      email : ""
   });
   const {username, email} = user;

   useEffect(() => {
      setUser({
         username: selectedData.username,
         email: selectedData.email,
      })
   },[selectedData])

   const createUser = (e) => {
      const selectedFilled = e.target.name;
      const selectedValue = e.target.value;

      setUser((preValue) => {
         return {
            ...preValue, 
            [selectedFilled]: [selectedValue]
         }
      })
   }

   const handleSubmit = ((e) => {
      e.preventDefault();
      handleSubmitData(user);
      setUser({
         username: "",
         email: "",
      });
   });



  return (
    <form onSubmit={handleSubmit}>
       <div className='input-filed'>
          <label htmlFor="username">Username: </label>
          <input 
            type="text" 
            placeholder='Enter your username'
            name='username'
            value={username}
            onChange={createUser} 
            required
         />
       </div>

       <div>
          <label htmlFor="email">Username: </label>
          <input 
            type="email" 
            placeholder='Enter your email'
            name='email'
            value={email}
            onChange={createUser} 
            required
         />
       </div>
       <button type='submit' className='btn'>{btnText}</button>
    </form>
  )
}

UserForm.defaultProps = {
   selectedData: {
      username : '',
      email : '',
   }
}

export default UserForm