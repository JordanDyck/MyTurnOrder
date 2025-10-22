import {useRef} from "react"
import type {conditions, CharacterProps} from "./Character"

type initiativeTypes = {
  character: CharacterProps["character"]
  setCharacter: CharacterProps["setCharacter"]
  setConditions: React.Dispatch<React.SetStateAction<conditions>>
}
const ChangeInitiative = ({character, setCharacter, setConditions}: initiativeTypes) => {
  const initiativeRef = useRef<HTMLInputElement>(null)
  const closePopUp = () => {
    setConditions((prev) => ({...prev, changeInitiative: false}))
  }

  const handleInitiativeChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = initiativeRef.current?.value

      if (!value) {
        closePopUp()
      } else {
        setCharacter((prev) => {
          const updatedCharacter = prev[character.side].map((char) =>
            char.id === character.id ? {...char, initiative: value} : char
          )
          localStorage.setItem(character.side, JSON.stringify(updatedCharacter))
          return {...prev, [character.side]: updatedCharacter}
        })
        closePopUp()
      }
    }
  }
  return (
    <div className="change-initiative">
      <h2>New Initiative: </h2>
      <input
        autoFocus
        className="initiative-input"
        type="number"
        id="initiative"
        ref={initiativeRef}
        onKeyUp={(e) => handleInitiativeChange(e)}
      />
    </div>
  )
}
export default ChangeInitiative
