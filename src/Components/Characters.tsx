import { Grid, Pagination } from "@mui/material";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import { useQuery } from "react-query";
import GapBar from "./GapBar";
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery(
    ["character", currentPage],
    () =>
      axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}`
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
  console.log(data?.data);
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
      <Grid container xs={12} justifyContent={"center"}>
        <Pagination
          count={42}
          defaultPage={1}
          variant="outlined"
          color="primary"
          onChange={(_e, page: number) => {
            setCurrentPage(page);
            window.scrollTo(0, 0);
          }}
        />
      </Grid>
      <GapBar />
    </Grid>
  );
};

export default Characters;
