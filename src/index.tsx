import { LaunchProps, Grid } from "@raycast/api";
import { PromptsList } from "./components/PromptsList";

export default function Command(props: LaunchProps<{ arguments: Arguments.Index }>) {

  const { type } = props.arguments;

  return (
    <>
      {
        type === "prompt" ? <PromptsList /> :
          <Grid
            inset={Grid.Inset.Large}
            navigationTitle="Search Video"
            searchBarPlaceholder="Search video about cursor code editor"
          // TODO
          >
            <Grid.EmptyView />
          </Grid>
      }
    </>
  );
}



