import React, { useEffect, useState } from 'react'
import { usePosts } from '../../context/PostsContext'

function UsersPost({user}) {
  const [usersPost,setUsersPost] = useState([])
  const {allPosts} = usePosts()
  
  useEffect(() =>{
    if(allPosts){
      const posts = allPosts.filter(post => post.userNick == user.userNick)
      if(posts){
        setUsersPost(posts)
      }
      console.log(usersPost)
    }
  }, [user])

  return (
    <div>
      {
        usersPost.map((post, index) =>{
          return <span style={{color:"#fff"}} key={index}>{post.userName}</span>
        })
      }
    </div>
  )
}

export default UsersPost
