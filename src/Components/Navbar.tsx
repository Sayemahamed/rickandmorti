import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const navigate = useLocation();
  return (
    <AppBar color="default">
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          width={"100%"}
        >
          <Link to="/">
            <Button>Rick-Morty-Wiki</Button>
          </Link>
          <Stack direction={"row"} spacing={1}>
            <Link to="/characters">
              <Button variant="contained" disabled={navigate.pathname == "/characters"}>
                Characters
              </Button>
            </Link>
            <Link to="/episodes">
              <Button
                variant="contained"
                disabled={navigate.pathname == "/episodes"}
              >
                Episodes
              </Button>
            </Link>
            <Link to="/locations">
              <Button
                variant="contained"
                disabled={navigate.pathname == "/locations"}
              >
                Location
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
