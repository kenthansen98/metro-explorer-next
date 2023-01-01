import dynamic from "next/dynamic";
import supabase from "../utils/supabase";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default async function Home() {
  const { data: cities } = await supabase.from("City").select("*");

  return (
    <div className="absolute z-0">
      <Map cities={cities} />
    </div>
  );
}
