import mockData from "./mockdata";

const MySpace = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
          <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
          {/* checkboxes */}
          <div className="form-control">
            {mockData.map((item) => (
              <label key={item.id} className="label cursor-pointer">
                <span className="label-text">{item.label}</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">My Space</h1>
          <p className="py-6">Welcome to the scheduler app. Use the button below to plan out your day and see what your friends are up to!</p>
          <button className="btn btn-primary">Create Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default MySpace;
