import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3 md:px-8">
          <Link
            to="/"
            className="text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            TRacer{" "}
            <span className="font-normal text-muted-foreground">
              JSON Builder
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
