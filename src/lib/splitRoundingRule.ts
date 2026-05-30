/**
 * Marketing + fairness copy — matches HabiMate app/backend cent-exact splits.
 */

export const SPLIT_ROUNDING_TITLE = "How we split cents";

export const SPLIT_ROUNDING_SHORT =
  "We only use whole cents. If the total doesn’t divide evenly, everyone gets the base amount and leftover cent(s) go to the first people in your participant list—one cent each.";

export const SPLIT_ROUNDING_EXAMPLE_TITLE = "Example: €10.00 split 3 ways";

export const SPLIT_ROUNDING_EXAMPLE_LINES = [
  "€10.00 = 1,000 cents",
  "1,000 ÷ 3 → €3.33 each, with 1 cent left over",
  "Shares: €3.34 · €3.33 · €3.33 (adds up to exactly €10.00)",
] as const;

export const SPLIT_ROUNDING_WHO_GETS_CENT =
  "The extra cent goes to the first person in the list order used for that split (Split with on a bill, or Who reimburses on a buy-back). Any further leftover cents go to the second person, then the third, and so on—same rule every time.";

export const SPLIT_ROUNDING_EQUAL_RULE =
  "Equal split: each person gets floor(total ÷ people). Remainder cents (0 to people−1) are distributed one at a time from the start of that list.";
