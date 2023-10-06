import { Grid, Pagination } from "@mui/material";
import CharacterCard from "./CharacterCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import GapBar from "./GapBar";
import { useEffect, useState } from "react";
import { Type } from "./DataType/Type.ts";

const Characters = () => {
  const [characterName, setCharacterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [URL, setURL] = useSearchParams();
  useEffect(() => {
    if (
      typeof URL.get("name") === "string" &&
      String(URL.get("name")).length > 0
    ) {
      setCharacterName(String(URL.get("name")));
    }
    if (
      typeof Number(URL.get("page")) === "number" &&
      Number(URL.get("page")) != 0
    )
      setCurrentPage(Number(URL.get("page")));
    else {
      setCurrentPage(1);
      setURL({ page: "1", name: characterName });
    }
  }, [URL, setURL]);
  console.log(characterName);
  const { data } = useQuery(
    ["character", currentPage, characterName],
    () =>
      axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${characterName}`
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
  useEffect(() => {
    setTotalPages(data?.data.info.pages);
  }, [data]);
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
          count={totalPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          onChange={(_e, page: number) => {
            setURL({ page: `${page}`, name: `${characterName}` });
            window.scrollTo(0, 0);
          }}
        />
      </Grid>
      <GapBar />
    </Grid>
  );
};

export default Characters;
