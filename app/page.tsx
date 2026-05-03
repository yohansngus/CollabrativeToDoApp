import Image from "next/image";

export default function Home() {
  const tasks = "border-l-4 border-orange-500 text-blue-600 text-xl pl-2.5";
  return (
    <div className="bg-gray-300 text-black">
      <h1 className="bg-white p-2 w-1/3 rounded-lg text-4xl font-bold text-base-content mb-4 ml-20 mt-10 text-black shadow-lg [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]">
        My Todo App
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-black">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Task</th>
              <th>Owner</th>
              <th>Time tracking</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>

              <td className={tasks}> Fix Zemlak's web for today deadline</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>1h 22m</td>
              <th>
                <button className="btn btn-ghost btn-xs bg-green-500">
                  Done
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>

              <td className={tasks}>Styling for Nayo's platform.</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>30m 5s</td>
              <th>
                <button className="btn btn-ghost btn-xs bg-orange-500">
                  Working on it
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>

              <td className={tasks}>James web fixing</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>1h 52s</td>
              <th>
                <button className="btn btn-ghost btn-xs bg-orange-500">
                  Working on it
                </button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>

              <td className={tasks}>Raul E-commerce</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>30m 2s</td>
              <th>
                <button className="btn btn-ghost btn-xs bg-green-500">
                  Done
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
