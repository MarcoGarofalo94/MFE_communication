import "./NavigationMenu.module.css";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ForumIcon from "@material-ui/icons/Forum";
import InfoIcon from "@material-ui/icons/Info";
import Label from "@material-ui/icons/Label";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import TableChartIcon from "@material-ui/icons/TableChart";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { CSSProperties } from "@material-ui/styles";
import React from "react";
import StyledTreeItem, {
  EntryType,
} from "@components-app/NavigationMenuItem/NavigationMenuItem";

declare module "csstype" {
  interface Properties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  })
);

interface NavigationMenuProps {
  entries: EntryType[];
  isOpen: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ entries, isOpen }) => {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {entries.map((entry, indexEntry) => {
        return (
          <StyledTreeItem
            isOpen={isOpen}
            key={indexEntry}
            nodeId={entry.id}
            labelText={entry.labelText}
            labelIcon={entry.labelIcon}
            color={entry.color}
            bgColor={entry.bgColor}
            entryChildren={entry.children}
            action={entry.action}
          />
        );
      })}
    </TreeView>
  );
};

export default NavigationMenu;
