import { Grid } from "@mui/material";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
type Type = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
const Characters = () => {
  const request = (page: number=1) => {
    return axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  };
  const { data } = useInfiniteQuery(["character"], () => request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    getNextPageParam: (_lastPage, Pages) => {
      if (Pages.length < 42) {
        return Pages.length + 1;
      } else return undefined;
    },
  });
  console.log(data?.pages);
  return (
    <Grid container gap={4} justifyContent={"center"}>
      {data?.data.results.map((result: Type) => (
        <CharacterCard
          key={result.id}
          image={result.image}
          id={result.id}
          gender={result.gender}
          name={result.name}
          origin={result.origin}
          species={result.species}
          type={result.type}
          status={result.status}
          location={result.location}
          created={result.created}
          episode={result.episode}
          url={result.url}
        />
      ))}
    </Grid>
  );
};

export default Characters;
