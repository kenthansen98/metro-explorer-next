import supabase from "../../utils/supabase";
import CityUi from "./CityUi";

const fetchLineData = async (cityId: number) => {
  const { data: systems } = await supabase
    .from("System")
    .select("*")
    .eq("city_id", cityId);
  if (!systems) {
    return null;
  }

  const { data: lines } = await supabase
    .from("Line")
    .select("id")
    .in(
      "system_id",
      systems.map((system) => system.id)
    );
  if (!lines) {
    return null;
  }

  const { data: sectionLines } = await supabase
    .from("SectionLines")
    .select(
      `
      id,
      Section (
        geometry,
        length
      ),
      line_id,
      Line (
        name,
        color,
        transport_mode_id,
        system_id
      )
      `
    )
    .in(
      "line_id",
      lines.map((line) => line.id)
    );

  if (!sectionLines) {
    return null;
  }

  return {
    systems,
    sectionLines: sectionLines.filter((section) => section.Section?.length > 0),
  };
};

export default async function City({ params }: { params: { city: string } }) {
  const { data: city } = await supabase
    .from("City")
    .select("*")
    .eq("url_name", params.city);

  if (!city) {
    return null;
  }

  const lineData = await fetchLineData(city[0].id);

  return (
    <>
      <CityUi lineData={lineData} city={city[0]} />
    </>
  );
}
