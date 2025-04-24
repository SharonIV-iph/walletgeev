import * as React from "react"

const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className="absolute w-1 h-1 p-0 -m-1 overflow-hidden whitespace-nowrap border-0 clip-[rect(0,0,0,0)]"
      {...props}
    />
  )
})
VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden } 