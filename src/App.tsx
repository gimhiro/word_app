import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Inputform from "./inputform";
import WordTables from "./table";
import wordsJson from "./wordle.json";
import { setOriginalNode } from "typescript";

export interface itemType {
  word: string;
  isInput: boolean;
  ox: string[];
}

const item1: itemType = {
  word: "slite",
  isInput: false,
  ox: ["B", "B", "Y", "G", "B"],
};

const item2: itemType = {
  word: "",
  isInput: true,
  ox: ["B", "B", "B", "B", "B"],
};

export const initialItem: itemType = {
  word: "",
  isInput: true,
  ox: ["B", "B", "B", "B", "B"],
};

const checkWord = (word: string, items: itemType[]) => {
  var flg = true;
  for (var i = 0; i < items.length; i++) {
    if (items[i].word.length == 5) {
      for (var j = 0; j < 5; j++) {
        switch (items[i].ox[j]) {
          case "B":
            if (word.includes(items[i].word[j])) {
              flg = false;
            }
            break;
          case "Y":
            if (
              items[i].word[j] == word[j] ||
              !word.includes(items[i].word[j])
            ) {
              flg = false;
            }
            break;
          case "G":
            if (items[i].word[j] != word[j]) {
              flg = false;
            }
            break;
          default:
            break;
        }
      }
    }
  }
  return flg;
};

const chars = "abcdefghijklmnopqrstuvwxyz";
type CntType = { [key: string]: number[] };
const makedict = (words: string[]) => {
  const cnt: CntType = {};
  for (var i = 0; i < 26; i++) {
    cnt[chars[i]] = Array(6).fill(0);
  }
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < 5; j++) {
      cnt[words[i][j]][j] += 1;
      cnt[words[i][j]][5] += 1;
    }
  }
  return cnt;
};
const calcScore = (word: string, cnt: CntType) => {
  const seen: string[] = [];
  var score = 0;
  for (var i = 0; i < 5; i++) {
    if (!seen.includes(word[i])) {
      seen.push(word[i]);
      score += Math.log2(cnt[word[i]][5] + cnt[word[i]][i] * 2);
    }
  }
  return score;
};

const initialWords: string[] = [];

for (var word in wordsJson) {
  initialWords.push(word);
}

const initialCnt = makedict(initialWords);
initialWords.sort(
  (a, b) => calcScore(b, initialCnt) - calcScore(a, initialCnt)
);

function App() {
  const [items, setItems] = useState([initialItem]);
  const [words, setWords] = React.useState(initialWords);
  const updateWords = () => {
    const newWords = words.filter((word: string) => checkWord(word, items));
    const cnt = makedict(newWords);
    const sortedWords = newWords.sort(
      (a, b) => calcScore(b, cnt) - calcScore(a, cnt)
    );
    console.log(sortedWords.length);
    setWords(sortedWords);
  };
  const resetWords = () => {
    setWords(initialWords);
  };
  console.log(items);
  return (
    <div className="App">
      <Inputform
        items={items}
        setItems={setItems}
        update={updateWords}
        reset={resetWords}
      />
      <WordTables items={items} words={words} />
    </div>
  );
}

export default App;
