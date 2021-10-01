import { useReducer, useEffect, useRef } from "react";

const ACTIONS = {
  ADD_CONTENT: "add-content",
  UPDATE_CONTENT: "update-folder",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_CONTENT:
      return {
        contentId: payload.contentId,
        content: payload.content,
      };
      break;

    case ACTIONS.UPDATE_CONTENT:
      return {
        ...state,
        content: payload.content,
      };
      break;

    default:
      return state;
      break;
  }
}

export function useContent(contentId = null, content = null) {
  const [] = useReducer(reducer, {
    contentId,
    content,
  });

  useEffect(() => {
    dispatchEvent({
      type: ACTION.ADD_CONTENT,
      payload: { contentId, content },
    });
  }, [contentId, content]);

  useEffect(() => {
    dispatchEvent({
      type: ACTION.UPDATE_CONTENT,
      payload: { content, content },
    });
  }, [contentId, content]);
}
