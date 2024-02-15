import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserInfoProvider } from './context/UserInfoContext';
import { PostsProvider } from './context/PostsContext';
import { UsersProvider } from './context/UsersContext';
import { PostCommentsProvider } from './context/PostCommentsContext';
import { MessagesProvider } from './context/MessagesContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserInfoProvider>
      <PostsProvider>
        <UsersProvider>  
          <PostCommentsProvider >
            <MessagesProvider>
              <App />
            </MessagesProvider>
          </PostCommentsProvider>     
        </UsersProvider>
      </PostsProvider>
    </UserInfoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
