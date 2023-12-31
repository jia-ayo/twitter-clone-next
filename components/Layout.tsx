import FollowBar from "./Layout/FollowBar";
import Sidebar from "./Layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-auto bg-black">
      <div className="container h-full xl:px-30 max-w-6xl ">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-4 sm:col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 pb-14 sm:pb-4">
            {children}
          </div>
          <FollowBar/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
