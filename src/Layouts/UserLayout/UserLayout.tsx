import { Outlet } from "react-router-dom";
import UsersNavBar from "../../Modules/UsersModules/UsersNavBar/UsersNavBar";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <UsersNavBar />

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
