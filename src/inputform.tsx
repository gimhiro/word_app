import { Box, Button } from "@mui/material";
import React from "react";
import { resolveTypeReferenceDirective } from "typescript";
import { initialItem, itemType } from "./App";
import Inputitem from "./inputitem";

const nextOX = (char: string) => {
  switch (char) {
    case "B":
      return "G";
    case "G":
      return "Y";
    case "Y":
      return "B";
    default:
      return char;
  }
};

const updateOX = (
  items: itemType[],
  setItems: Function,
  i: number,
  j: number
) => {
  const newitem = {
    ...items[i],
    ox: items[i].ox.map((chr, k) => (k == j ? nextOX(chr) : chr)),
  };
  setItems(items.map((item, k) => (k == i ? newitem : item)));
};

const updateOXi = (items: itemType[], setItems: Function, i: number) => {
  return (j: number) => updateOX(items, setItems, i, j);
};

const addItem = (items: itemType[], setItems: Function, update: Function) => {
  if (validWords(items)) {
    update();
    setItems([
      ...items.map((item, i) =>
        i == items.length - 1 ? { ...item, isInput: false } : item
      ),
      initialItem,
    ]);
  } else {
    alert("invalid words.");
  }
};

const validWords = (items: itemType[]) => {
  var flg = true;
  for (var i = 0; i < items.length; i++) {
    if (items[i].word.length != 5) {
      flg = false;
    }
  }
  return flg;
};

const resetItem = (items: itemType[], setItems: Function, reset: Function) => {
  reset();
  setItems([initialItem]);
};

const Inputform = (props: any) => {
  return (
    <div className="inputform">
      {props.items.map((item: itemType, i: number) => (
        <Inputitem
          item={item}
          key={i}
          func={updateOXi(props.items, props.setItems, i)}
        />
      ))}
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => addItem(props.items, props.setItems, props.update)}
        >
          SEARCH
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => resetItem(props.items, props.setItems, props.reset)}
        >
          RESET
        </Button>
      </Box>
    </div>
  );
};

export default Inputform;
