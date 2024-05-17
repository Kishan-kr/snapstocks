import React from 'react'
import UserProfile from '../Common/UserProfile'

function SearchUsers() {
  const users = [
    {name: 'Diana Light', username: 'dreamcatchlight', hireable: true},
    {name: 'Diana Light', username: 'dreamcatchlight', hireable: false},
    {name: 'Diana Light', username: 'dreamcatchlight', hireable: true},
    {name: 'Diana Light', username: 'dreamcatchlight', hireable: true},
    {name: 'Diana Light', username: 'dreamcatchlight', hireable: false},
  ]

  return (
    <div className='flex flex-wrap px-2 gap-x-6 gap-y-8 md:px-4'>{
      users.map(user => (
        <UserProfile user={user}/>
      ))
    }</div>
  )
}

export default SearchUsers