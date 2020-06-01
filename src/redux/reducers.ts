import { Reducer, combineReducers } from "redux";

import { State } from "./state";
import {
  AddRootTreeItemAction,
  AddChildTreeItemAction,
  EditTreeItemAction,
  DeleteTreeItemAction,
  SetTreeItemIdOnEditModeAction,
} from "./actions";

export const treeItems: Reducer<
  State["treeItems"],
  | AddRootTreeItemAction
  | AddChildTreeItemAction
  | EditTreeItemAction
  | DeleteTreeItemAction
> = (treeItems = [], action) => {
  switch (action.type) {
    case "ADD_ROOT_TREE_ITEM":
      return [
        ...treeItems,
        {
          id: action.id,
          title: "",
          allParentIds: [],
        },
      ];
    case "ADD_CHILD_TREE_ITEM": {
      const { id, parentId, allParentIdsOfParent } = action;

      return [
        ...treeItems,
        {
          id,
          parentId,
          title: "",
          allParentIds: [
            ...(allParentIdsOfParent ? allParentIdsOfParent : []),
            parentId,
          ],
        },
      ];
    }
    case "EDIT_TREE_ITEM": {
      const { id, title } = action;
      const treeItemIndex = treeItems.findIndex((item) => item.id === id);
      const newTreeItems = [...treeItems];
      newTreeItems[treeItemIndex].title = title;

      return newTreeItems;
    }
    case "DELETE_TREE_ITEM": {
      const { id: deletingItemId } = action;
      return treeItems.filter(
        ({ id, allParentIds }) =>
          allParentIds &&
          !allParentIds.includes(deletingItemId) &&
          id !== deletingItemId
      );
    }
    default:
      return treeItems;
  }
};

export const treeItemIdOnEditMode: Reducer<
  State["treeItemIdOnEditMode"],
  SetTreeItemIdOnEditModeAction
> = (id = null, action) => {
  return action.type === "SET_TREE_ITEM_ID_ON_EDIT_MODE"
    ? action.treeItemIdOnEditMode
    : id;
};

export const rootReducer = combineReducers({
  treeItems,
  treeItemIdOnEditMode,
});
