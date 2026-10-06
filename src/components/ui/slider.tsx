import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex h-11 w-full touch-none items-center select-none", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-surface-2">
      <SliderPrimitive.Range className="absolute h-full bg-accent" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-4 rounded-full border border-border bg-fg shadow-panel focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
