import { Outlet } from "react-router-dom";

export const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-svh">
      {/* TODO: add app bar / sidebar when ready */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
