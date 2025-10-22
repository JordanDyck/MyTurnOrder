import {useState} from "react"
import type {TcharacterList} from "../App"
import Character from "./Character"
import {RiDeleteBinLine} from "react-icons/ri"

const Characterlist = ({characterList, setCharacterList}: TcharacterList) => {
  const [activeCharacter, setActiveCharacter] = useState(0)

  const removeCharacter = (side: "players" | "foes", index: number) => {
    const filteredCharacters = characterList[side].filter((_, i) => i !== index)
    setCharacterList((prev) => ({...prev, [side]: filteredCharacters}))
    localStorage.setItem(
      side === "players" ? "players" : "foes",
      JSON.stringify(filteredCharacters)
    )
  }
  const sortedPlayers = characterList.players?.sort((a, b) => b.initiative - a.initiative)
  const sortedFoes = characterList.foes?.sort((a, b) => b.initiative - a.initiative)
  const allCharacters = [...sortedPlayers, ...sortedFoes].sort(
    (a, b) => b.initiative - a.initiative
  )

  const nextTurn = () => {
    setActiveCharacter((prevChar) => (prevChar + 1) % allCharacters.length)
  }
  const currentTurn = allCharacters[activeCharacter]

  return (
    <div className="character-list">
      <button className="turn-btn" onClick={() => nextTurn()}>
        next turn
      </button>
      <header>Players</header>
      {sortedPlayers?.map(({name}, index) => (
        <div className="character-container players" key={`${name}_${index}`}>
          <Character
            character={characterList.players[index]}
            setCharacter={setCharacterList}
            currentTurn={currentTurn}
          />
          <button className="delete-btn" onClick={() => removeCharacter("players", index)}>
            <RiDeleteBinLine />
          </button>
        </div>
      ))}
      <header>Enemies</header>
      {sortedFoes?.map(({name}, index) => (
        <div className="character-container foes" key={`${name}_${index}`}>
          <Character
            character={characterList.foes[index]}
            setCharacter={setCharacterList}
            currentTurn={currentTurn}
          />
          <button className="delete-btn" onClick={() => removeCharacter("foes", index)}>
            <RiDeleteBinLine />
          </button>
        </div>
      ))}
    </div>
  )
}
export default Characterlist
