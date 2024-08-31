import { Category, Prompt } from "../types";

export const getCategories = (rules: Prompt[]): Category[] => {
  const categories = Array.from(new Set(rules.flatMap((rule) => rule.tags)));
  return categories
    .map((tag) => ({
      slug: tag,
      prompts: rules.filter((rule) => rule.tags.includes(tag)),
    }))
    .sort((a, b) => b.prompts.length - a.prompts.length);

};



