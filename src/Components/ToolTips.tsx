import type {conditions} from "./Character"

type TtoolTips = keyof Omit<conditions, "changeHealth" | "changeInitiative">

const ToolTips = ({showTooltip}: {showTooltip: TtoolTips}) => {
  const showTip = (type: TtoolTips) => {
    switch (type) {
      case "blind":
        return (
          <p>
            A blinded creature can't see and automatically fails any ability check that requires
            sight.
            <span>Attack rolls against the creature have advantage</span>, and the{" "}
            <span>creature's attack rolls have disadvantage</span>.
          </p>
        )
      case "poison":
        return (
          <p>
            A poisoned creature has disadvantage on <span>attack rolls</span> and{" "}
            <span>ability checks</span>.
          </p>
        )
      case "burn":
        return (
          <p>
            burning creatures take <span>1 D4 fire damage</span> at the start of their turn.
          </p>
        )
      case "paralized":
        return (
          <p>
            A paralyzed creature can't take actions, reactions, move, or speak. The creature
            automatically <span>fails Strength and Dex saving throws</span>. Attack rolls{" "}
            <span>against the creature have advantage</span>.hits on the the creature within{" "}
            <span>5 feet</span> are a <span>critical hit</span>
          </p>
        )
      case "grappled":
        return (
          <p>
            A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.
            The condition ends if the grappler is incapacitated.
          </p>
        )
      case "invisible":
        return (
          <p>
            An invisible creature is impossible to see without the aid of magic or a special sense.{" "}
            <span>
              Attack rolls against the creature have disadvantage, and the creature's attack rolls
              have advantage.
            </span>
          </p>
        )

      default:
        return null
    }
  }

  return <div className="tool-tip">{showTip(showTooltip)}</div>
}
export default ToolTips
