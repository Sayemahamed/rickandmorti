import { Grid, Pagination } from "@mui/material";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import GapBar from "./GapBar";
import { useEffect, useState } from "react";
import { Type } from "./DataType/Type.ts";

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [URL, setURL] = useSearchParams();
  console.log(Number(URL.get("page")));
  useEffect(() => {
    if (
      typeof Number(URL.get("page")) === "number" &&
      Number(URL.get("page")) != 0
    )
      setCurrentPage(Number(URL.get("page")));
    else {
      setCurrentPage(1);
      setURL({ page: "1" });
    }
  }, [URL, setURL]);
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
      <Grid container justifyContent={"center"}>
        <Pagination
          count={42}
          page={currentPage}
          variant="outlined"
          color="primary"
          onChange={(_e, page: number) => {
            setURL({ page: `${page}` });
            window.scrollTo(0, 0);
          }}
        />
      </Grid>
      <GapBar />
    </Grid>
  );
};

export default Characters;
