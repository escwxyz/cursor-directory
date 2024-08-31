import { useCachedPromise } from "@raycast/utils";
import { useState } from "react";
import { getCategories } from "../utils/getCategories";
import { Prompt } from "../types";
import prompts from '../data/prompts.json'
import { List } from "@raycast/api";
import { PromptListItem } from "./PromptListItem";

export const PromptsList = () => {
  const [showingDetail, setShowingDetail] = useState<boolean>(true);

  const { data: rules, isLoading } = useCachedPromise(() => fetchPrompts());


  const categories = rules ? getCategories(rules) : [];

  return (<List isLoading={isLoading} isShowingDetail={showingDetail}
  // onSelectionChange={(id) => {
  //   // TODO
  //   const selected = rules?.find(rule => rule.slug === id);
  //   if (selected) {
  //     setSelectedCategory(selected.tags[0]); // Set to the first tag of the selected prompt
  //   }
  // }}
  >
    {
      categories.map((category) => (
        <List.Section key={category.slug} title={category.slug}>
          {
            category.prompts.map((prompt, index) => (
              <PromptListItem
                key={prompt.slug + index}
                prompt={prompt}
                category={category}
                setShowingDetail={setShowingDetail}
                showingDetail={showingDetail}
              />
            ))
          }
        </List.Section>
      ))
    }
  </List>)

}

// TODO mimic
async function fetchPrompts(): Promise<Prompt[]> {
  return new Promise((resolve) => setTimeout(() => resolve(prompts), 500));
}



