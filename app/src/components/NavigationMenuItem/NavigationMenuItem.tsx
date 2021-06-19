import {
  makeStyles,
  SvgIconProps,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import { createStyles, CSSProperties } from "@material-ui/styles";

import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";

export interface EntryType {
  id: string;
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  action?: () => void;
  children?: EntryType[];
  labelInfo?: string;
  labelText: string;
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  isOpen: boolean;
  entryChildren?: EntryType[];
  action?: () => any;
};

export default function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles() as any;
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    entryChildren,
    action,
    isOpen,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          {isOpen && (
            <LabelIcon color="inherit" className={classes.labelIcon} />
          )}
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          {!isOpen && (
            <Tooltip title={labelText}>
              <LabelIcon color="inherit" className={classes.labelIcon} />
            </Tooltip>
          )}
        </div>
      }
      onClick={action}
      style={
        {
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor,
        } as CSSProperties
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
      children={
        entryChildren
          ? entryChildren.map((child, childIndex) => {
              return (
                <StyledTreeItem
                  key={childIndex}
                  isOpen={isOpen}
                  nodeId={child.id}
                  labelText={child.labelText}
                  labelIcon={child.labelIcon}
                  entryChildren={child.children}
                  color={child.color}
                  bgColor={child.bgColor}
                  action={child.action}
                />
              );
            })
          : props.children
      }
    />
  );
}

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      "&:hover > $content": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus > $content, &$selected > $content": {
        backgroundColor: `var(--tree-view-bg-color)`,
        color: "var(--tree-view-color)",
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
        backgroundColor: "transparent",
      },
    },
    content: {
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
      transition: "all .35s ease-in-out",
    },
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      margin: theme.spacing(0.5),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
    },
  })
);
