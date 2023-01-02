"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

interface Props {
  city?: any;
  lineData?: {
    systems: any[];
    sectionLines: any[];
  } | null;
}

export default function CityUi({ lineData, city }: Props) {
  const [systems, setSystems] = useState<string[]>([
    ...(lineData?.systems?.map((system) => system.id) || []),
  ]);

  return (
    <>
      <div className="absolute z-0">
        <Map
          city={city}
          sectionLines={
            lineData?.sectionLines.filter((sectionLine) =>
              systems.includes(sectionLine.Line.system_id)
            ) || null
          }
        />
      </div>
      <div className="flex w-screen h-screen">
        <div className="w-80 z-10 bg-slate-400 rounded-lg shadow-md self-center ml-5 p-4">
          <h2 className="font-bold text-2xl text-center">Systems</h2>
          <ul>
            {lineData?.systems.map((system) => (
              <li key={system.id}>
                <input
                  type="checkbox"
                  checked={systems.includes(system.id)}
                  onChange={() =>
                    setSystems(
                      systems.includes(system.id)
                        ? systems.filter((sys) => sys !== system.id)
                        : systems.concat(system.id)
                    )
                  }
                />{" "}
                {system.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
