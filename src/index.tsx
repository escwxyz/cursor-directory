import { PromptsList } from "./components/PromptsList";
import { cache } from "./utils";

cache.set("favoritePrompts", JSON.stringify([]));

export default function Command() {

  // const { type } = props.arguments;

  return (
    <>
      <PromptsList />
    </>
  );
}



