import { Prompt } from "../types";
import { Action, ActionPanel, Detail, Image, Icon, openExtensionPreferences, showHUD, Clipboard } from "@raycast/api";
import { getAvatarIcon } from "@raycast/utils";
import { isImageUrl, processContent } from "../utils";

interface Props {
  prompt: Prompt;
  popularOnly: boolean;
}

export const PromptDetail = ({ prompt, popularOnly }: Props) => {
  return (
    <Detail
      navigationTitle={prompt.title}
      markdown={processContent(prompt.content)}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label
            title="Author"
            text={prompt.author.name}
            icon={{
              source: (isImageUrl(prompt.author.avatar) && prompt.author.avatar) || getAvatarIcon(prompt.author.name),
              mask: Image.Mask.Circle,
            }}
          />
          {prompt.author.url && (
            <Detail.Metadata.Link title="Author URL" target={prompt.author.url} text={prompt.author.url} />
          )}
          {popularOnly && prompt.count && (
            <Detail.Metadata.Label
              title="Used by"
              text={prompt.count > 1 ? `${prompt.count} people` : `${prompt.count} person`}
            />
          )}
          <Detail.Metadata.TagList title="Tags">
            {prompt.tags.map((tag) => (
              <Detail.Metadata.TagList.Item key={tag} text={tag} />
            ))}
          </Detail.Metadata.TagList>
          {prompt.libs.length > 0 && (
            <Detail.Metadata.TagList title="Libraries">
              {prompt.libs.map((lib) => (
                <Detail.Metadata.TagList.Item key={lib} text={lib} />
              ))}
            </Detail.Metadata.TagList>
          )}
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Actions">
            <Action
              title="Copy Prompt"
              icon={Icon.Clipboard}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
              onAction={async () => {
                await Clipboard.copy(prompt.content);
                await showHUD("Copied to clipboard, paste it into .cursorrules file");
              }}
            />
            <Action.OpenInBrowser
              // eslint-disable-next-line @raycast/prefer-title-case
              title="Open in cursor.directory"
              icon={Icon.Link}
              url={`https://cursor.directory/${prompt.slug}`}
            />
            {prompt.author.url && (
              <Action.OpenInBrowser title="Open Author URL" icon={Icon.Person} url={prompt.author.url} />
            )}
            <Action.CopyToClipboard
              title="Share Prompt"
              icon={Icon.Hashtag}
              content={`https://cursor.directory/${prompt.slug}`}
              shortcut={{ modifiers: ["cmd"], key: "y" }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section title="Settings">
            <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
};
