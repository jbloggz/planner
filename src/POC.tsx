import Draggable from 'react-draggable';
import ThemeToggle from './components/ThemeToggle';
import { useState } from 'react';
import WorkBlock from './components/WorkBlock';

function POC() {
  const firstColumnWidth = 'w-64';
  const [zoom, setZoom] = useState(0);
  const widths = ['w-8', 'w-10', 'w-12', 'w-14', 'w-20'];
  const widthsPx = [32, 40, 48, 56, 80];
  const cellWidth = widths[zoom];
  const cellWidthPx = widthsPx[zoom];
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [selectedElem, setSelectedElem] = useState('');
  const [originalPos, setOrginalPos] = useState({ x: 0, y: 0 });

  const plan = [
    {
      name: 'Hart Hagerty',
      avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
      role: 'Frontend',
      tasks: [
        { name: 'ENG-41: Seek first', days: 2, start: '2025-02-02' },
        { name: 'ENG-42: Seek first', days: 4, start: '2025-02-06' },
      ],
    },
    {
      name: 'Brice Swyre',
      avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
      role: 'Backend',
      tasks: [{ name: 'ENG-43: Seek first', days: 5, start: '2025-01-26' }],
    },
    {
      name: 'Marjy Ferencz',
      avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
      role: 'QA',
      tasks: [],
    },
  ];

  const range = {
    start: '2025-01-25',
    end: '2025-02-22',
  };

  return (
    <>
      <div className="navbar bg-base-300 flex">
        <img className="w-7 mr-4" src="/planner.png" alt="logo" />
        <h1 className="text-xl font-semibold grow">Planner</h1>
        <ThemeToggle lightTheme="light" darkTheme="dark" className="float-right" />
      </div>
      <div className="container mx-auto px-3 my-3">
        <div className="card w-full shadow-xl">
          <div className="card-body p-2">
            <input type="range" min={0} max={15} value={zoom} onChange={(ev) => setZoom(+ev.currentTarget.value)} className="range my-5 w-64" />
            <WorkBlock id={213} color={'yellow'} title={'ENG-43: Do the thing'} days={5} zoom={zoom} />

            <div className="overflow-x-scroll">
              <table className="table order-collapse text-nowrap table-pin-cols table-fixed">
                <thead>
                  <tr>
                    <th className={`${firstColumnWidth}`}></th>
                    <td colSpan={1} className="overflow-hidden overflow-ellipsis" style={{ width: cellWidthPx * 1 }}>
                      January
                    </td>
                    <td colSpan={19} className="overflow-hidden overflow-ellipsis" style={{ width: cellWidthPx * 19 }}>
                      February
                    </td>
                    <td></td>
                  </tr>
                  <tr className="text-center">
                    <th>
                      <label className="input input-ghost flex items-center w-56">
                        <input type="text" className="w-44" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>
                    </th>
                    <td className={`${cellWidth}`}>
                      Wed
                      <br />
                      25
                    </td>
                    <td className={`${cellWidth}`}>
                      Thu
                      <br />
                      26
                    </td>
                    <td className={`${cellWidth}`}>
                      Fri
                      <br />
                      27
                    </td>
                    <td className={`${cellWidth}`}>
                      Mon
                      <br />
                      30
                    </td>
                    <td className={`${cellWidth}`}>
                      Tue
                      <br />
                      31
                    </td>
                    <td className={`${cellWidth}`}>
                      Wed
                      <br />1
                    </td>
                    <td className={`${cellWidth}`}>
                      Thu
                      <br />2
                    </td>
                    <td className={`${cellWidth}`}>
                      Fri
                      <br />3
                    </td>
                    <td className={`${cellWidth}`}>
                      Mon
                      <br />6
                    </td>
                    <td className={`${cellWidth}`}>
                      Tue
                      <br />7
                    </td>
                    <td className={`${cellWidth}`}>
                      Wed
                      <br />8
                    </td>
                    <td className={`${cellWidth}`}>
                      Thu
                      <br />9
                    </td>
                    <td className={`${cellWidth}`}>
                      Fri
                      <br />
                      10
                    </td>
                    <td className={`${cellWidth}`}>
                      Mon
                      <br />
                      13
                    </td>
                    <td className={`${cellWidth}`}>
                      Tue
                      <br />
                      14
                    </td>
                    <td className={`${cellWidth}`}>
                      Wed
                      <br />
                      15
                    </td>
                    <td className={`${cellWidth}`}>
                      Thu
                      <br />
                      16
                    </td>
                    <td className={`${cellWidth}`}>
                      Fri
                      <br />
                      17
                    </td>
                    <td className={`${cellWidth}`}>
                      Mon
                      <br />
                      20
                    </td>
                    <td className={`${cellWidth}`}>
                      Tue
                      <br />
                      21
                    </td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">Frontend</div>
                        </div>
                      </div>
                    </th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Draggable
                        grid={[cellWidthPx, 85]}
                        bounds={{ left: -cellWidthPx * 6, right: cellWidthPx * 12, top: 0, bottom: 170 }}
                        onStart={() => {
                          setOrginalPos({ x: 6, y: 0 });
                          setSelectedElem('ENG-41: Seek first');
                        }}
                        onDrag={() => {}}
                        onStop={(_, data) => {
                          setPos({ x: originalPos.x + data.x / cellWidthPx, y: originalPos.y + data.y / 85 });
                        }}>
                        <div
                          id="37"
                          style={{ width: cellWidthPx * 2 - 8 }}
                          className="bg-green-900 opacity-90 rounded-md flex flex-col gap-1 p-2 font-semibold">
                          <div className="overflow-hidden">ENG-41: Seek first</div>
                          <div className="overflow-hidden">2 days</div>
                        </div>
                      </Draggable>
                    </td>
                    <td></td>
                    <td>
                      <Draggable
                        grid={[cellWidthPx, 85]}
                        bounds={{ left: -cellWidthPx * 8, right: cellWidthPx * 8, top: 0, bottom: 170 }}
                        onStart={() => {
                          setOrginalPos({ x: 8, y: 0 });
                          setSelectedElem('ENG-42: Seek first');
                        }}
                        onDrag={() => {}}
                        onStop={(_, data) => {
                          setPos({ x: originalPos.x + data.x / cellWidthPx, y: originalPos.y + data.y / 85 });
                        }}>
                        <div
                          id="148"
                          style={{ width: cellWidthPx * 4 - 8 }}
                          className="card bg-green-900 opacity-90 rounded-md flex flex-col gap-1 p-2 font-semibold">
                          <div className="overflow-hidden">ENG-42: Seek first</div>
                          <div className="overflow-hidden">4 days</div>
                        </div>
                      </Draggable>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Brice Swyre</div>
                          <div className="text-sm opacity-50">Backend</div>
                        </div>
                      </div>
                    </th>
                    <td></td>
                    <td>
                      <Draggable
                        grid={[cellWidthPx, 85]}
                        bounds={{ left: -cellWidthPx * 1, right: cellWidthPx * 14, top: -85, bottom: 85 }}
                        onStart={() => {
                          setOrginalPos({ x: 1, y: 1 });
                          setSelectedElem('ENG-43: Seek first');
                        }}
                        onDrag={() => {}}
                        onStop={(_, data) => {
                          setPos({ x: originalPos.x + data.x / cellWidthPx, y: originalPos.y + data.y / 85 });
                        }}>
                        <div
                          id="123"
                          style={{ width: cellWidthPx * 5 - 8 }}
                          className={`card bg-orange-900 opacity-90 rounded-md flex flex-col gap-1 p-2 font-semibold`}>
                          <div className="overflow-hidden">ENG-43: Seek first</div>
                          <div className="overflow-hidden">5 days</div>
                        </div>
                      </Draggable>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Marjy Ferencz</div>
                          <div className="text-sm opacity-50">QA</div>
                        </div>
                      </div>
                    </th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="mt-4">
              <p>Selected Element: {selectedElem}</p>
              <p>Original Position X: {originalPos.x}</p>
              <p>Original Position Y: {originalPos.y}</p>
              <p>New Position X: {pos.x}</p>
              <p>New Position Y: {pos.y}</p>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default POC;
