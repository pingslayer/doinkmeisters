import JoditEditor from "jodit-react";

const JoditEditorModded = (props) => {
  const joditEditorConfig = {
    readonly: false,
    theme: "dark",
    buttons: [
      {
        group: "font-style",
        buttons: [],
      },
      {
        group: "list",
        buttons: ["ul", "ol"],
      },
      {
        group: "indent",
        buttons: [],
      },
      {
        group: "font",
        buttons: [],
      },
      {
        group: "color",
        buttons: [],
      },
    ],
  };

  return <JoditEditor config={joditEditorConfig} />;
};

export default JoditEditorModded;
