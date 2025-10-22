import NewCharacter from "./Components/NewCharacter"
import Characterlist from "./Components/Characterlist"
import {useState} from "react"

export type Tcharacter = {
  name: string
  initiative: number
  health: {current: number; max: number}
  side: "players" | "foes"
  id: number
}

export type CharacterGroups = {
  players: Tcharacter[]
  foes: Tcharacter[]
}

export type TcharacterList = {
  characterList: CharacterGroups
  setCharacterList: React.Dispatch<React.SetStateAction<CharacterGroups>>
}

function App() {
  const storage = {
    players: JSON.parse(localStorage.getItem("players") ?? "[]") as Tcharacter[],
    foes: JSON.parse(localStorage.getItem("foes") ?? "[]") as Tcharacter[],
  }
  const [characterList, setCharacterList] = useState(storage)

  return (
    <div className="App">
      <div className="new-character-container">
        <NewCharacter characterList={characterList} setCharacterList={setCharacterList} />
      </div>

      <div className="character-list-wrapper">
        <Characterlist characterList={characterList} setCharacterList={setCharacterList} />
      </div>
    </div>
  )
}

export default App
