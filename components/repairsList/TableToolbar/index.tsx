import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

export function TableToolbar({ selectedCount }: { selectedCount: number }) {

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selectedCount > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {selectedCount > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedCount} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {" "}
          </Typography>
        )}
        {selectedCount > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      // <Box style={getRamdomBackgroundColor()} sx={{ ml: "13px", mb: 2 }}>
      //     <Button size="small" variant="contained" sx={{ mr: "20px" }}>
      //         <PlaylistAddIcon fontSize="small" sx={{ mr: "10px" }} />
      //         MODIFICAR ESTADO
      //     </Button>
      //     <Button size="small" color={"error"} variant="outlined">
      //         <DeleteIcon fontSize="small" sx={{ mr: "10px" }} />
      //         Eliminar
      //     </Button>
      // </Box>
    );
  }
  