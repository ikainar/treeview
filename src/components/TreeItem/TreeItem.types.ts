export interface TreeItemView {
  id: string;
  title: string;
  parentId?: string;
  allParentIds: string[];
}

export interface TreeItemViewProps {
  treeItem: TreeItemView;
}
