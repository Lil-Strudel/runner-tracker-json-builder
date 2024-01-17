import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Check } from "lucide-react";

function FileName() {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const toggleMode = () => {
    setMode(mode === "view" ? "edit" : "view");
  };

  return (
    <div>
      <FormField
        name="fileName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                {mode === "edit" && (
                  <div className="flex gap-4">
                    <Input className="max-w-sm" {...field} />
                    <Button variant="outline" size="icon" onClick={toggleMode}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {mode === "view" && (
                  <div className="flex gap-4">
                    <h1 className="text-4xl">{field.value}</h1>
                    <Button variant="outline" size="icon" onClick={toggleMode}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default FileName;
