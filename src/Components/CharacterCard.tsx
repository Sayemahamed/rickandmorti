import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
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
const CharacterCard = (prop: Type) => {
  const { image, name, status, gender, type, species, origin: ori } = prop;
  return (
    <Card sx={{ maxWidth: 370 }}>
      <CardMedia sx={{ height: 270, width: "100%" }} image={image}></CardMedia>
      <CardContent>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h6">{species}</Typography>
        <Typography variant="button">{gender}</Typography>
        <Typography>{type}</Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ mr: ori?.name.length < 10 ? 13 : 2 }}>{ori.name} </Button>
        <Button
          variant="contained"
          size="small"
          disabled={status == "unknown"}
          color={status == "Dead" ? "error" : "success"}
        >
          {status}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
