import {useRef} from "react"
import type {conditions, CharacterProps} from "./Character"

type HealthTypes = {
  character: CharacterProps["character"]
  setCharacter: CharacterProps["setCharacter"]
  setConditions: React.Dispatch<React.SetStateAction<conditions>>
}

const HealthPopUp = ({character, setCharacter, setConditions}: HealthTypes) => {
  const healthRef = useRef<HTMLInputElement>(null)

  const closePopUp = () => {
    setConditions((prev) => ({...prev, changeHealth: false}))
  }

  const handleHealthChange = (type: "DMG" | "HEAL") => {
    const value = healthRef.current?.value
    if (!value) closePopUp()

    const newHealth =
      type === "DMG"
        ? //--- damage ---
          character.health.current - Number(value)
        : //--- heal ---
          character.health.current + Number(value)

    setCharacter((prev) => {
      const updatedCharacter = prev[character.side].map((char) =>
        char.id === character.id
          ? {
              ...char,
              health: {
                ...char.health,
                current:
                  type === "HEAL" && newHealth > char.health.max ? char.health.max : newHealth,
              },
            }
          : char
      )
      localStorage.setItem(character.side, JSON.stringify(updatedCharacter))
      return {...prev, [character.side]: updatedCharacter}
    })

    closePopUp()
  }

  return (
    <div className="health-popup">
      <h2>
        Health: {character.health.current}/{character.health.max}
      </h2>
      <div className="health-control">
        <button onClick={() => handleHealthChange("DMG")} className="DMG">
          DMG
        </button>
        <input autoFocus className="health-input" type="number" ref={healthRef} />
        <button onClick={() => handleHealthChange("HEAL")} className="HEAL">
          HEAL
        </button>
      </div>
    </div>
  )
}
export default HealthPopUp
