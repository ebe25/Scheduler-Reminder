/* eslint-disable no-unused-vars */
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">SCHEDULER APP</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-x-8">
  <div className="grid flex-grow h-30 card bg-base-300 rounded-box place-items-center p-8">
  <h1 className="text-3xl font-bold">My Space</h1>
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Task 1</span>
        <input type="checkbox" defaultChecked className="checkbox checkbox-primary ml-2" />
      </label>
    </div>
    <div className="form-control mt-2">
      <label className="label cursor-pointer">
        <span className="label-text">Task 2</span>
        <input type="checkbox" defaultChecked className="checkbox checkbox-primary ml-2" />
      </label>
    </div>
    <div className="form-control mt-2">
      <label className="label cursor-pointer">
        <span className="label-text">Task 3</span>
        <input type="checkbox" defaultChecked className="checkbox checkbox-primary ml-2" />
      </label>
    </div>
  </div>
</div>


      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row justify-center items-center">
          {/* left active users */}
          <div className="text-center lg:text-left lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold">Active Users</h1>
            <ul className="menu bg-base-200 rounded-box space-y-2">
              <li>
                <a>User 1</a>
              </li>
              <li>
                <a>User 2</a>
              </li>
              <li>
                <a>User 3</a>
              </li>
              <li>
                <a>User 4</a>
              </li>
              <li>
                <a>User 5</a>
              </li>
              <li>
                <a>User 6</a>
              </li>
              <li>
                <a>User 7</a>
              </li>
            </ul>
          </div>
          {/* right panel user plans */}
          <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
            {/* checkboxes */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">LeetCode</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">HackerRank</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Development</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Contributions</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Seggs</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Mutton Biryani</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Thandi Beer</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current">
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            ACME Industries Ltd. <br />
            Providing reliable tech since 1992
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default App;
