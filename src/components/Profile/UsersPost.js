import React, { useEffect, useState } from 'react'
import { usePosts } from '../../context/PostsContext'
import Post from '../Home/Posts/Post'
function UsersPost({user}) {
  const [usersPost,setUsersPost] = useState([])
  const {allPosts} = usePosts()
  
  useEffect(() =>{
    if(allPosts){
      const posts = allPosts.filter(post => post.userNick == user.userNick)
      if(posts){
        setUsersPost(posts)
      }
    }
  }, [user])

  return (
    <div style={{color:"#fff"}}>
      {
        usersPost.map((post, index) =>{
          return <Post key={index} post={post} />
        })
      }
    </div>
  )
}

export default UsersPost
