import { createBrowserRouter,  } from "react-router-dom";

import { PrivateRoute } from "./private-routes";
import { SignIn } from "../pages/SignIn";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { EditProfile } from "../pages/EditProfile";
import { EditPost } from "../pages/EditPost";

export const routes = createBrowserRouter([
  {
      path: '/',
      element: <SignIn />
  },
  {
      path: '/register',
      element: <Register />
  },
  {
      path: '/home',
      element: <PrivateRoute Screen={Home} />
  },
  {
    path: '/update-post/:id',
    element: <PrivateRoute Screen={EditPost} />
  },
  // {
  //   path: '/friend-list',
  //   element: <PrivateRoute Screen={FriendList} />
  // },
  // {
  //   path: '/friend-profile/:id',
  //   element: <PrivateRoute Screen={FriendProfileScreen} />
  // },
  // {
  //   path: '/friend-request',
  //   element: <PrivateRoute Screen={FriendshipRequestList} />
  // },
  // {
  //   path: '/list-users',
  //   element: <PrivateRoute Screen={ListUsers} />
  // },
  {
    path: '/edit-profile',
    element: <PrivateRoute Screen={EditProfile} />
  },
])
