import { z } from "zod";

type ValidationContext = "my-format" | "ultra-format" | "json-file";

interface FormattedError {
  field: string;
  message: string;
}

/**
 * Converts Zod validation errors into human-readable error messages
 * tailored to the specific file format being validated
 */
export function formatZodError(
  issues: z.ZodIssue[],
  context: ValidationContext
): string {
  const errors = parseZodIssues(issues, context);

  if (errors.length === 0) {
    return "An unknown validation error occurred.";
  }

  const header = getHeaderText(context);
  const errorLines = errors.map((err, idx) => `${idx + 1}. ${err.message}`);

  return [header, "", ...errorLines].join("\n");
}

/**
 * Parse Zod issues into user-friendly error messages
 */
function parseZodIssues(
  issues: z.ZodIssue[],
  context: ValidationContext
): FormattedError[] {
  return issues.map((issue) => {
    const fieldPath = issue.path.length > 0 ? String(issue.path[0]) : "unknown";
    const message = getErrorMessage(issue, fieldPath, context);

    return {
      field: fieldPath,
      message,
    };
  });
}

/**
 * Convert a single Zod issue into a human-readable message
 */
function getErrorMessage(
  issue: z.ZodIssue,
  fieldPath: string,
  _context: ValidationContext
): string {
  const fieldName = formatFieldName(fieldPath);

  switch (issue.code) {
    case "invalid_type":
      return `${fieldName} has the wrong type. Expected ${issue.expected}, but got something else.`;

    case "too_small":
      if (issue.type === "string") {
        return `${fieldName} is too short. Please provide text.`;
      }
      if (issue.type === "array") {
        return `${fieldName} should have at least ${issue.minimum} items.`;
      }
      return `${fieldName} is too small.`;

    case "too_big":
      if (issue.type === "string") {
        return `${fieldName} is too long.`;
      }
      if (issue.type === "array") {
        return `${fieldName} has too many items.`;
      }
      return `${fieldName} is too large.`;

    case "invalid_enum_value":
      const validValues = issue.options
        ? issue.options.join(", ")
        : "limited values";
      return `${fieldName} has an invalid value. Allowed values: ${validValues}.`;

    case "invalid_literal":
      return `${fieldName} must be exactly: ${JSON.stringify(issue.expected)}.`;

    case "unrecognized_keys":
      const unknownKeys = issue.keys ? issue.keys.join(", ") : "unknown";
      return `Unknown fields found: ${unknownKeys}. Please remove them.`;

    case "invalid_union":
      return `${fieldName} doesn't match any of the expected formats.`;

    case "invalid_date":
      return `${fieldName} is not a valid date. Use format: YYYY-MM-DD.`;

    default:
      return `${fieldName} is invalid. Please check the value and try again.`;
  }
}

/**
 * Format field names to be user-friendly
 */
function formatFieldName(fieldPath: string): string {
  // Remove underscores and capitalize words
  const cleanName = fieldPath
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim();

  const words = cleanName.split(" ");
  const capitalizedWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Add quotes for emphasis
  return `"${capitalizedWords}"`;
}

/**
 * Get the header text based on the validation context
 */
function getHeaderText(context: ValidationContext): string {
  switch (context) {
    case "my-format":
      return "There's an issue with your CSV file format. Expected columns: Bib, First Name, Last Name, Age Group (or Age/Sex), and optionally: Home, Team, Race Name, Note.";

    case "ultra-format":
      return "There's an issue with your UltraSignup CSV file. Expected columns: Bib, First, Last, Age, City, Loc, Race, and optionally: Rank, Age Rank, Results, Target.";

    case "json-file":
      return "There's an issue with your JSON file format. It should include: name, stations (array), participants (array), and optionally: startDate, endDate, races.";

    default:
      return "The file format is invalid.";
  }
}
