import { Icons } from "./icons"

export const Wind = () => {
  return (
    <div className="grid place-items-center bg-mediumBlue">
      <h3 className="py-5 text-xl">Wind Status</h3>

      <div className="flex items-center py-3">
        {/* Wind Speed */}
        <span className="font-bold text-8xl">7</span>
        {/* Wind Unit */}
        <span className="text-2xl font-medium">mph</span>
      </div>

      <div className="flex items-center gap-2 py-3">
        {/* Wind Direction */}
        <div>
          {/* Wind Icon */}
          <Icons.direction />
        </div>
        {/* Wind direction abbreviation */}
        <span className="text-xl">NE</span>
      </div>
    </div>
  )
}
