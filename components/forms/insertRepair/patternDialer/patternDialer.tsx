import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import { makeAbsoluteCopy } from "../../../../helper/makeAbsoluteCopy";
import { usePatternDialerState } from "./hooks/usePatternDialerState";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useDebounce from "../../../../helper/useDebounce";

const PatternVertex = (props: { value: string; onClick: any; data: any }) => {
  const color = props.data.clicked ? "primary" : "default";

  return (
    <Grid onClick={props.onClick} container item xs={4}>
      <Fab size="small" color={color} aria-label="add">
        {props.data.clicked && <span>{props.value}</span>}
        {/* <span>{props.value}</span> */}
      </Fab>
    </Grid>
  );
};

export default function PatterDialer(props: { valueNotifier: any }) {
  const dialerState = usePatternDialerState();

  // const debouncedValue = useDebounce(dialerState.values.value, 1000);

  useEffect(() => {
    // console.log({PatterDialer:{debouncedValue}})
    props.valueNotifier(dialerState.values.value);
  }, [dialerState.values.value])



  return (
    <>
      {((value: string) => {
        if (value == "")
          return (
            <Typography
              // sx={{ maxWidth: "260px" }}
              variant="h6"
              gutterBottom
              component="div"
            >
              Para agregar el patrón, da click en los círculos en el orden
              correspondiente.
            </Typography>
          );

        if (value != "")
          return (
            <Button
              variant="outlined"
              onClick={dialerState.actions.resetPattern}
            >
              Volver a empezar
            </Button>
          );
      })(dialerState.values.value)}

      <Card sx={{ maxWidth: "250px", marginTop: "23px" }} variant="outlined">
        <CardContent>
          <Grid container spacing={3} columns={12}>
            {dialerState.values.clicks.map((item, index) => {
              return (
                <PatternVertex
                  key={`${index}_device_pattern`}
                  value={`${index + 1}`}
                  data={item}
                  onClick={(e: any) => dialerState.actions.handleOnclick(index)}
                />
              );
            })}
          </Grid>
          <Typography
            sx={{ marginTop: 4, letterSpacing: 2 }}
            align={"center"}
            variant="subtitle1"
            component="h2"
          >
            |{dialerState.values.value}|
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
