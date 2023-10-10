import Link from "next/link";
import routes from "../../data/routes.json";
import NavLink from "../../utils/NavLink";

export function MobileDrawer({ opened, setOpened }: ToggleProps) {
  function handleClick() {
    setOpened(false);
  }

  return (
    <div
      className={`transition-all duration-300 w-full -z-10 md:hidden grid overflow-hidden ${
        opened ? "grid-rows-[1fr] p-3" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0 transition-all duration-300">
        <ul className="space-y-2">
          {routes.map((route, index) => (
            <li key={index}>
              <NavLink href={route.route}>
                {({ isActive }) => (
                  <div
                    onClick={() => setOpened(false)}
                    className="flex items-center gap-1.5 group"
                  >
                    <div
                      className={`bg-[#FF9400]/70 w-1 rounded-full transition-all duration-300  ${
                        isActive ? "h-6" : "group-hover:h-6 h-1"
                      }`}
                    />
                    <div
                      className={`font-semibold rounded-md p-2 transition-all duration-300 w-full max-w-md ${
                        isActive ? "bg-[#FF9400]" : "hover:bg-[#FF9400]/70"
                      }`}
                    >
                      {route.name}
                    </div>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link
          href="/auth/login"
          onClick={handleClick}
          className={`w-full rounded-md bg-[#FF9400] text-white font-bae flex justify-center items-center py-2 active:scale-95 transition-all duration-300 mt-3`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
