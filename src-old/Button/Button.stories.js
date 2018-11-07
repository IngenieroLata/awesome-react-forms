import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./Button";

const onClickAction = action("clicked");
onClickAction.toString = () => "action('clicked')";

storiesOf("Button", module)
  .addWithJSX("with text", () => (
    <Button onClick={onClickAction}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={onClickAction}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
