import { Action, ActionPanel, Icon, List, Image } from "@raycast/api";
import { Category, Prompt } from "../types";
import { PromptDetail } from "./PromptDetail";
import { getAvatarIcon } from "@raycast/utils";


interface Props {
  prompt: Prompt;
  category: Category;
  setShowingDetail: (showingDetail: boolean) => void;
  showingDetail: boolean;
}

export const PromptListItem = ({ prompt, category, showingDetail, setShowingDetail }: Props) => {
  const props = showingDetail ? {
    detail: (
      <List.Item.Detail
        markdown={renderPrompt(prompt)}
        metadata={
          <List.Item.Detail.Metadata>
            <List.Item.Detail.Metadata.Label text={category.slug} title={prompt.title} />
            <List.Item.Detail.Metadata.Label title="Created by" text={prompt.author.name} icon={{
              source: prompt.author.avatar || getAvatarIcon(prompt.author.name),
              mask: Image.Mask.Circle,
            }} />
          </List.Item.Detail.Metadata>
        }
      />
    ),
  } : { accessories: [{ text: prompt.tags.join(", ") }] };

  return (
    <List.Item
      key={prompt.slug} // No need for index, slug should be unique
      title={prompt.title}
      {...props}
      actions={
        <ActionPanel>
          <Action.Push
            title="View Prompt"
            icon={Icon.Text}
            target={<PromptDetail prompt={prompt} />}
          // onPush={() => setSelectedCategory(prompt.tags[0])} // TODO: Handle this in the parent component
          />
          <Action.CopyToClipboard
            title="Copy Prompt"
            icon={Icon.Clipboard}
            content={prompt.content}
            shortcut={{ modifiers: ["cmd"], key: "c" }}
          />
          <Action
            title="Toggle Detail"
            icon={Icon.List}
            shortcut={{ modifiers: ["cmd"], key: "d" }}
            onAction={() => setShowingDetail(!showingDetail)} // TODO: Handle this in the parent component
          />
        </ActionPanel>
      }
    />
  );
};
//
// TODO not looking good
function renderPrompt(prompt: Prompt): string {
  return `
${prompt.content.substring(0, 200)}...
`
}


