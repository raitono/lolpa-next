import { useEffect, useState } from "react";
import { IChampion } from "../models/champion";

interface ChampionProps {
  id: number,
  gameVersion: string
}

const Champion: React.FC<ChampionProps> = ({ id, gameVersion }: ChampionProps) => {
  const [data, setData] = useState<IChampion>();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/champion/${id}`)
      .then(response => response.json())
      .then(setData);
  }, []);

  if (!data)
    return (
      <div>Loading champion {id}</div>
    );

  const tags = data.tags.reduce((prev, curr, idx, arr) => curr + ((arr.length - 1) === idx ? "" : " "));

  // image width is width+24 to allow for 12 padding on either side
  return (
    // <div className="row align-items-center">
    //   <img alt={data.name} src={`http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/${data.image.group}/${data.image.full}`} style={{ height: "100px", width: "124px" }} />
    //   <div className="col-2">
    //     <div className="row justify-content-center">{data.name}</div>
    //     <div className="row"><hr /></div>
    //     <div className="row justify-content-center">{data.title}</div>
    //   </div>
    //   <div className="col-2">
    //     <div className="row">
    //       Tags: {tags}
    //     </div>
    //   </div>
    // </div>
    <div>needs converted to tailwind</div>
  );
}

export default Champion;
