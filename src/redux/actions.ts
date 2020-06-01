import { State } from "./index";
import { TreeItemView } from "../components/TreeItem/TreeItem.types";

type Action<TType extends string = string, TPayload extends object = {}> = {
  type: TType
} & TPayload;

export type AddRootTreeItemAction = Action<
  "ADD_ROOT_TREE_ITEM",
  Pick<TreeItemView, "id">
>;

export type AddChildTreeItemAction = Action<
  "ADD_CHILD_TREE_ITEM",
  Required<
    Pick<TreeItemView, "id" | "parentId"> & {
      allParentIdsOfParent: TreeItemView["allParentIds"];
    }
  >
>;

export type DeleteTreeItemAction = Action<
  "DELETE_TREE_ITEM",
  Pick<TreeItemView, "id">
>;

export type EditTreeItemAction = Action<
  "EDIT_TREE_ITEM",
  Pick<TreeItemView, "id" | "title">
>;

export const addRootTreeItem = (
  id: TreeItemView["id"]
): AddRootTreeItemAction => {
  return {
    type: "ADD_ROOT_TREE_ITEM",
    id,
  };
};

export const addChildTreeItem = (
  id: TreeItemView["id"],
  parentId: Required<TreeItemView>["parentId"],
  allParentIdsOfParent: Required<TreeItemView>["allParentIds"]
): AddChildTreeItemAction => {
  return {
    type: "ADD_CHILD_TREE_ITEM",
    id,
    parentId,
    allParentIdsOfParent,
  };
};

export const deleteTreeItem = (
  id: TreeItemView["id"]
): DeleteTreeItemAction => {
  return {
    type: "DELETE_TREE_ITEM",
    id,
  };
};

export const editTreeItem = (
  id: TreeItemView["id"],
  title: TreeItemView["title"]
): EditTreeItemAction => {
  return {
    type: "EDIT_TREE_ITEM",
    id,
    title,
  };
};

export type SetTreeItemIdOnEditModeAction = Action<
  "SET_TREE_ITEM_ID_ON_EDIT_MODE",
  Pick<State, "treeItemIdOnEditMode">
>;

export const setTreeItemIdOnEditMode = (
  treeItemIdOnEditMode: State["treeItemIdOnEditMode"]
): SetTreeItemIdOnEditModeAction => {
  return {
    type: "SET_TREE_ITEM_ID_ON_EDIT_MODE",
    treeItemIdOnEditMode,
  };
};
