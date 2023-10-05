import { FormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp, move } from "@/lib/utils";

const CARD_HEIGHT = 80;
const CARD_GAP = 16; // same as gap-4

const CARD_TOTAL = CARD_HEIGHT + CARD_GAP;

const springFn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index: number) =>
    active && index === originalIndex
      ? {
          y: curIndex * CARD_TOTAL + y,
          scale: 1.05,
          zIndex: 1,
          shadow: 10,
          immediate: (key: string) => key === "zIndex",
          config: config.stiff,
        }
      : {
          y: order.indexOf(index) * CARD_TOTAL,
          scale: 1,
          zIndex: 0,
          shadow: 0,
          immediate: false,
        };

interface StationsProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
}
function Stations({ control, register }: StationsProps) {
  const stationsField = useFieldArray({
    control,
    name: "stations",
  });

  const fields = stationsField.fields;

  const order = useRef(fields.map((_, index) => index));

  const [springs, api] = useSprings(fields.length, springFn(order.current));

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * CARD_TOTAL + y) / CARD_TOTAL),
      0,
      fields.length - 1,
    );
    const newOrder = move(order.current, curIndex, curRow);
    api.start(springFn(newOrder, active, originalIndex, curIndex, y));
    if (!active) order.current = newOrder;
  });

  return (
    <div>
      <div className="relative">
        {springs.map((_, i) => (
          <div key={i} className="h-[96px]" />
        ))}
        <div className="absolute top-0 left-0 w-full">
          {springs.map(({ zIndex, shadow, y, scale }, i) => (
            <animated.div
              {...bind(i)}
              key={i}
              style={{
                zIndex,
                boxShadow: shadow.to(
                  (s) => `rgba(0, 0, 0, ${s / 100}) 0px ${s}px ${2 * s}px 0px`,
                ),
                y,
                scale,
                height: CARD_HEIGHT,
              }}
              className="absolute touch-none bg-white rounded-md border w-full"
              children={
                <div>
                  <h1 className="text-2xl">{fields[i].name}</h1>
                </div>
              }
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center mx-auto w-fit">
        <Button
          onClick={() => {
            stationsField.append({
              name: "test" + stationsField.fields.length,
              stationNumber: stationsField.fields.length,
            });
            order.current = [...order.current, order.current.length];
          }}
        >
          Add Station
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Stations;
