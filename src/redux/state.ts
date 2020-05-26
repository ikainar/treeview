import { TreeItemView } from "../components/TreeItem/TreeItem.types";

export interface State {
  treeItems: TreeItemView[];
  treeItemIdOnEditMode: string | null;
}
