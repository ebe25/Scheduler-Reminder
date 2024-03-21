import Button from "./button";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <Button />

      <div className="flex flex-grow justify-center">
        <a className="btn text-xl">SCHEDULER APP</a>
      </div>

      <div className="gap-6">
        <div>
          <button className="btn btn-primary">Login</button>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
