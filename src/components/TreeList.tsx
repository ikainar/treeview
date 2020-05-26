import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

import { addRootTreeItem, setTreeItemIdOnEditMode, State } from "../redux";

import { TreeItem } from "./TreeItem/TreeItem";

export const TreeList: React.FC = () => {
  const dispatch = useDispatch();
  const treeItems = useSelector<State, State["treeItems"]>(
    (state) => state.treeItems
  );

  return (
    <React.Fragment>
      <IconButton
        aria-label="create"
        onClick={() => {
          const id = uuid();
          dispatch(addRootTreeItem(id));
          dispatch(setTreeItemIdOnEditMode(id));
        }}
      >
        <CreateNewFolderIcon fontSize="large" />
      </IconButton>
      <List>
        {treeItems
          .filter((treeItem) => !treeItem.parentId)
          .map((treeItem) => (
            <TreeItem key={treeItem.id} treeItem={treeItem} />
          ))}
      </List>
    </React.Fragment>
  );
};
