
import App from '../App';
import Home from '../components/Home/Home';
import Following from '../components/Following/Following';
import SearchPhotos from '../components/Search/SearchPhotos';
import SearchResult from '../components/Search/SearchResult';
import SearchCollections from '../components/Search/SearchCollections';
import SearchUsers from '../components/Search/SearchUsers';
import AccountSettings from '../components/Settings/AccountSettings';
import EditProfile from '../components/Settings/EditProfile';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import UserPhotos from '../components/User/UserPhotos';
import UserDashboard from '../components/User/UserDashboard';
import UsersLikes from '../components/User/UsersLikes';
import UserCollections from '../components/User/UserCollections';
import PhotoView from '../components/Common/PhotoView';

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [{
    path: '',
    element: <Home/>
  },{
    path: 'login',
    element: <Login/>
  },{
    path: 'signup',
    element: <Signup/>
  },{
    path: 'following',
    element: <Following/>
  },{
    path: 'search',
    element: <SearchResult/>,
    children: [{
      path: 'photos',
      element: <SearchPhotos/>
    }, {
      path: 'collections',
      element: <SearchCollections/>
    }, {
      path: 'users',
      element: <SearchUsers/>
    },]
  }, {
    path: 'account',
    element: <AccountSettings/>,
    children: [{
      path: '',
      element: <EditProfile/>
    }]
  }, {
    path: 'photos/:id',
    element: <PhotoView />,
  }, {
    path: ':username', 
    element: <UserDashboard/>,
    children: [{
      path: '',
      element: <UserPhotos/>
    }, {
      path: 'likes',
      element: <UsersLikes/>
    }, {
      path: 'collections',
      element: <UserCollections/>
    }]
  }]
}]);


export default router