import type {Tcharacter, CharacterGroups} from "../App"
import {GiPoisonBottle, GiFire, GiFocusedLightning, GiInvisibleFace} from "react-icons/gi"
import {FaHandsHoldingChild, FaRegEyeSlash} from "react-icons/fa6"
import {useState} from "react"
import HealthPopUp from "./HealthPopUp"
import ChangeInitiative from "./ChangeInitiative"

export type conditions = {
  blind: boolean
  burn: boolean
  poison: boolean
  paralized: boolean
  grappled: boolean
  invisible: boolean
  changeHealth: boolean
  changeInitiative: boolean
}
export type CharacterProps = {
  character: Tcharacter
  setCharacter: React.Dispatch<React.SetStateAction<CharacterGroups>>
  currentTurn: Tcharacter
}

const Character = ({character, setCharacter, currentTurn}: CharacterProps) => {
  const {name, initiative, health} = character
  const [conditions, setConditions] = useState<conditions>({
    blind: false,
    burn: false,
    poison: false,
    paralized: false,
    grappled: false,
    invisible: false,
    changeHealth: false,
    changeInitiative: false,
  })
  const handleConditions = (condition: keyof typeof conditions) => {
    setConditions((prev) => ({...prev, [condition]: !prev[condition]}))
  }

  return (
    <div
      className="character"
      style={{backgroundColor: currentTurn === character ? "#85f385" : "#e7e7e7"}}
    >
      {conditions.changeHealth && (
        <>
          <HealthPopUp
            character={character}
            setCharacter={setCharacter}
            setConditions={setConditions}
          />
        </>
      )}
      {conditions.changeInitiative && (
        <ChangeInitiative
          character={character}
          setCharacter={setCharacter}
          setConditions={setConditions}
        />
      )}
      <h2 className="char-name"> {name}</h2>
      <h2 className="initiative" onClick={() => handleConditions("changeInitiative")}>
        Init: {initiative}
      </h2>
      <h2 className="health" onClick={() => handleConditions("changeHealth")}>
        HP: {health.current}
      </h2>
      <div className="conditions">
        <FaRegEyeSlash
          onClick={() => handleConditions("blind")}
          style={{color: conditions.blind ? "#4e9f91" : "#00000080"}}
        />
        <GiPoisonBottle
          onClick={() => handleConditions("poison")}
          style={{color: conditions.poison ? "purple" : "#00000080"}}
        />
        <GiFire
          onClick={() => handleConditions("burn")}
          style={{color: conditions.burn ? "red" : "#00000080"}}
        />
        <GiFocusedLightning
          onClick={() => handleConditions("paralized")}
          style={{color: conditions.paralized ? "#e7cd00" : "#00000080"}}
        />
        <FaHandsHoldingChild
          onClick={() => handleConditions("grappled")}
          style={{color: conditions.grappled ? "green" : "#00000080"}}
        />
        <GiInvisibleFace
          onClick={() => handleConditions("invisible")}
          style={{color: conditions.invisible ? "#b943d5" : "#00000080"}}
        />
      </div>
    </div>
  )
}
export default Character
