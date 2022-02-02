import { Button, styled, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { sign } from "crypto";
import React, { useState } from "react";
import { itemType } from "./App";

const ItemButton = React.memo((props: any) => {
  return (
    <>
      <button
        className={"OXbox " + props.v}
        onClick={() => props.f(props.i)}
        disabled={!props.isInput}
      ></button>
    </>
  );
});

const Inputitem = React.memo((props: any) => {
  const [word, setWord] = useState("");
  props.item.word = word.toLowerCase();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(() => e.target.value);
  };
  return (
    <Box sx={{ display: "inline-flex" }}>
      <TextField
        value={word}
        onChange={handleChange}
        label={props.item.isInput ? "word" : "Read Only"}
        InputProps={{
          readOnly: !props.item.isInput,
        }}
        variant="outlined"
      />
      {props.item.ox.map((v: string, i: number) => {
        return (
          <ItemButton
            v={v}
            key={i}
            i={i}
            f={props.func}
            isInput={props.item.isInput}
          />
        );
      })}
    </Box>
  );
});

export default Inputitem;
