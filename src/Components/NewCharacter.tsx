import type {Tcharacter, TcharacterList} from "../App"

const NewCharacter = ({characterList, setCharacterList}: TcharacterList) => {
  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // all data that goes into new characters
    const name = String(formData.get("name") || "").trim()
    const initiative = Number(formData.get("initiative") || 0)
    const side = (formData.get("side") === "foe" ? "foes" : "players") as Tcharacter["side"]
    const health = {
      current: Number(formData.get("health") || 0),
      max: Number(formData.get("health") || 0),
    }
    const id = characterList[side].length + 1

    //groups data into an object and adds it to local storage and state
    const NewCharacter = {name, initiative, health, side, id}
    const storage = localStorage.getItem(side)
    if (storage !== null) {
      const updatedStorage = [...JSON.parse(storage), NewCharacter]
      // if characters already exist in storage, it adds the new character to the existing array
      localStorage.setItem(NewCharacter.side, JSON.stringify(updatedStorage))
      setCharacterList((prev) => ({...prev, [side]: updatedStorage}))
    } else {
      localStorage.setItem(NewCharacter.side, JSON.stringify([NewCharacter]))
      // creates local storage with the side the new character is on.
      setCharacterList((prev) => ({...prev, [side]: [NewCharacter]}))
    }
    if (!formData.get("keep-settings")) {
      // Resets form if "keep settings" is not checked
      e.currentTarget.reset()
    }
  }

  return (
    <div>
      <form className="new-character-form" onSubmit={handleForm}>
        <div className="info-container">
          <input className="char-name" name="name" placeholder="name" />
          <input className="initiative" name="initiative" placeholder="init" type="number" />
          <input className="health" type="number" name="health" placeholder="health" />
          <label htmlFor="keep-settings">
            keep settings:
            <input type="checkbox" name="keep-settings" id="keep-settings" />
          </label>
        </div>
        <div className="toggles">
          <label htmlFor="player">Player</label>
          <input
            className="player-toggle"
            name="side"
            id="player"
            type="radio"
            value={"player"}
            defaultChecked
          />
          <label htmlFor="foe">Enemy</label>
          <input className="foe-toggle" id="foe" name="side" value={"foe"} type="radio" />
        </div>
        <button type="submit">Add Character</button>
      </form>
    </div>
  )
}
export default NewCharacter
