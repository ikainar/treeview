import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import Input, { InputProps } from "@material-ui/core/Input";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  addChildTreeItem,
  editTreeItem,
  deleteTreeItem,
  setTreeItemIdOnEditMode,
  State,
} from "../../redux";

import { TreeItemViewProps } from "./TreeItem.types";

export const TreeItem: React.FC<TreeItemViewProps> = ({ treeItem }) => {
  const { title } = treeItem;
  const dispatch = useDispatch();
  const treeItems = useSelector<State, State["treeItems"]>(
    (state) => state.treeItems
  );

  const treeItemIdOnEditMode = useSelector<
    State,
    State["treeItemIdOnEditMode"]
  >((state) => state.treeItemIdOnEditMode);
  const [collapsed, setCollapsed] = React.useState(true);
  const [changeTitle, setChangedTitle] = React.useState(title);

  const handleChildTreeItemAddition = () => {
    const id = uuid();
    dispatch(addChildTreeItem(id, treeItem.id, treeItem.allParentIds));
    dispatch(setTreeItemIdOnEditMode(id));
    setCollapsed(false);
  };

  const handleTreeItemEdition = () => {
    dispatch(setTreeItemIdOnEditMode(treeItem.id));
  };

  const handleTreeItemDeletion = () => {
    dispatch(deleteTreeItem(treeItem.id));
  };

  const handleSaveTreeItemTitle: (value: string) => void = (value: string) => {
    if (!value && !title) {
      handleTreeItemDeletion();
    } else {
      dispatch(editTreeItem(treeItem.id, value || title));
      dispatch(setTreeItemIdOnEditMode(null));
      setChangedTitle(value || title);
    }
  };

  const handleEnterPress: InputProps["onKeyDown"] = ({
    currentTarget: { value },
    key,
  }) => {
    if (key === "Enter") {
      handleSaveTreeItemTitle(value);
    }
  };

  const handleOnBlur: InputProps["onBlur"] = ({ currentTarget: { value } }) => {
    handleSaveTreeItemTitle(value);
  };

  return (
    <React.Fragment>
      <ListItem divider={true} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
        {treeItemIdOnEditMode === treeItem.id ? (
          <Input
            style={{ marginRight: "20%", color: "orange" }}
            onKeyDown={handleEnterPress}
            onChange={(event) => setChangedTitle(event.currentTarget.value)}
            onBlur={handleOnBlur}
            value={changeTitle}
            placeholder={"new node"}
            disableUnderline={true}
            fullWidth={true}
            autoFocus={true}
          />
        ) : (
          <ListItemText primary={title} />
        )}
        <ListItemSecondaryAction>
          <IconButton onClick={handleChildTreeItemAddition} edge="end">
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleTreeItemEdition} edge="end">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleTreeItemDeletion} edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      {!collapsed && (
        <div style={{ paddingLeft: 10 }}>
          {treeItems
            .filter((child) => child.parentId === treeItem.id)
            .map((child) => (
              <TreeItem key={child.id} treeItem={child} />
            ))}
        </div>
      )}
    </React.Fragment>
  );
};
