import { useParams } from "react-router-dom";
import UserDashboard from "./UserDashboard";

function UserDashboardWithAtSymbol() {
  const { username } = useParams();
  const usernameWithAt = username[0] === '@' ? username: `@${username}`;

  return <UserDashboard username={usernameWithAt} />;
};

export default UserDashboardWithAtSymbol;