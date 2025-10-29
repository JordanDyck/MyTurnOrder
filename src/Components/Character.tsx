import type {Tcharacter, CharacterGroups} from "../App"
import {GiPoisonBottle, GiFire, GiFocusedLightning, GiInvisibleFace} from "react-icons/gi"
import {FaHandsHoldingChild, FaRegEyeSlash} from "react-icons/fa6"
import {useState} from "react"
import HealthPopUp from "./HealthPopUp"
import ChangeInitiative from "./ChangeInitiative"
import ToolTips from "./ToolTips"

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
  currentTurn: Tcharacter | null
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
  const [showToolTip, setShowToolTip] = useState<string | undefined>()
  const handleConditions = (condition: keyof typeof conditions) => {
    setConditions((prev) => ({...prev, [condition]: !prev[condition]}))
  }

  const ShowToolTip = (type: string | undefined) => {
    setShowToolTip(type)
  }
  const hideToolTip = () => {
    setShowToolTip(undefined)
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
      <span className="break">|</span>
      <h2 className="initiative" onClick={() => handleConditions("changeInitiative")}>
        Init: {initiative}
      </h2>
      <h2 className="health" onClick={() => handleConditions("changeHealth")}>
        HP: {health.current}
      </h2>
      <div className="conditions">
        <div className="condition-group">
          {showToolTip === "blind" && <ToolTips showTooltip={showToolTip} />}
          <FaRegEyeSlash
            onClick={() => handleConditions("blind")}
            onMouseEnter={() => ShowToolTip("blind")}
            onMouseLeave={() => hideToolTip()}
            style={{color: conditions.blind ? "#4e9f91" : "#00000080"}}
          />
        </div>
        <div className="condition-group">
          {showToolTip === "poison" && <ToolTips showTooltip={showToolTip} />}
          <GiPoisonBottle
            onClick={() => handleConditions("poison")}
            onMouseEnter={() => ShowToolTip("poison")}
            onMouseLeave={() => hideToolTip()}
            style={{color: conditions.poison ? "purple" : "#00000080"}}
          />
        </div>
        <div className="condition-group">
          {showToolTip === "burn" && <ToolTips showTooltip={showToolTip} />}
          <GiFire
            onClick={() => handleConditions("burn")}
            onMouseEnter={() => ShowToolTip("burn")}
            onMouseLeave={() => hideToolTip()}
            style={{color: conditions.burn ? "red" : "#00000080"}}
          />
        </div>
        <div className="condition-group">
          {showToolTip === "paralized" && <ToolTips showTooltip={showToolTip} />}
          <GiFocusedLightning
            onClick={() => handleConditions("paralized")}
            onMouseEnter={() => ShowToolTip("paralized")}
            onMouseLeave={() => hideToolTip()}
            style={{color: conditions.paralized ? "#e7cd00" : "#00000080"}}
          />
        </div>
        <div className="condition-group">
          {showToolTip === "grappled" && <ToolTips showTooltip={showToolTip} />}
          <FaHandsHoldingChild
            onClick={() => handleConditions("grappled")}
            onMouseEnter={() => ShowToolTip("grappled")}
            onMouseLeave={() => hideToolTip()}
            style={{color: conditions.grappled ? "green" : "#00000080"}}
          />
        </div>
        <div className="condition-group">
          {showToolTip === "invisible" && <ToolTips showTooltip={showToolTip} />}
          <GiInvisibleFace
            onClick={() => handleConditions("invisible")}
            onMouseEnter={() => ShowToolTip("invisible")}
            onMouseLeave={() => hideToolTip()}
            style={{color: conditions.invisible ? "#b943d5" : "#00000080"}}
          />
        </div>
      </div>
    </div>
  )
}
export default Character
