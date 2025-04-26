import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveObjectAsFile(
  fileName: string,
  fileType: "json" | "csv",
  obj: unknown,
) {
  const json = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
  const blob = new Blob([json], {
    type: fileType === "json" ? "application/json" : "text/csv",
  });
  const href = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + (fileType === "json" ? ".json" : ".csv");
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export function clamp(number: number, lower: number, upper: number) {
  number = +number;
  lower = +lower;
  upper = +upper;
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;
  if (number === number) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
}

export function move<T>(array: T[], moveIndex: number, toIndex: number) {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}

export const getAgeGroup = (age: number, gender: "" | "M" | "F") => {
  if (!gender) return "";
  if (age === 0) return "";

  let ageGroup = "";
  if (age < 20) {
    ageGroup = "<20";
  } else if (age < 30) {
    ageGroup = "20-29";
  } else if (age < 40) {
    ageGroup = "30-39";
  } else if (age < 50) {
    ageGroup = "40-49";
  } else if (age < 60) {
    ageGroup = "50-59";
  } else if (age < 70) {
    ageGroup = "60-69";
  } else if (age < 80) {
    ageGroup = "70-79";
  } else if (age < 90) {
    ageGroup = "80-89";
  }

  if (!ageGroup) return "";

  return `${gender}${ageGroup}`;
};

export const parseAgeGroup = (str?: string) => {
  let ageFromGroup: string | undefined;
  let sexFromGroup: "M" | "F" | undefined;

  if (str) {
    if (str.charAt(0) === "M") {
      sexFromGroup = "M";
      ageFromGroup = str.slice(1);
    } else if (str.charAt(0) === "F") {
      sexFromGroup = "F";
      ageFromGroup = str.slice(1);
    } else {
      ageFromGroup = str;
    }
  }

  return { ageFromGroup, sexFromGroup };
};

export function sanitizeReplacementChar<T>(input: T): T {
  const replacementChar = "\uFFFD";

  if (typeof input === "string") {
    return input.replace(new RegExp(replacementChar, "g"), "") as unknown as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeReplacementChar(item)) as unknown as T;
  }

  if (input && typeof input === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newObj: any = {}; // We need 'any' here to build the new object dynamically
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newObj[key] = sanitizeReplacementChar((input as any)[key]);
      }
    }
    return newObj as T;
  }

  return input;
}
