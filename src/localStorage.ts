import { TreeItemView } from "./components/TreeItem/TreeItem.types";

export const loadTreeItems = (): TreeItemView[] => {
  try {
    const stateFromLocalStorage = localStorage.getItem("treeItems");

    if (!stateFromLocalStorage) {
      return [];
    }

    const treeItems: TreeItemView[] = JSON.parse(stateFromLocalStorage);

    return treeItems.filter((treeItem) => treeItem.title);
  } catch (err) {
    console.error(err);

    return [];
  }
};

export const saveTreeItems = (treeItems: TreeItemView[]) => {
  try {
    localStorage.setItem("treeItems", JSON.stringify(treeItems));
  } catch (err) {
    console.error(err);
  }
};
