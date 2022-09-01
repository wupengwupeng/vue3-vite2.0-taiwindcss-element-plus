export type childrenType = {
  path?: string;
  noShowingChildren?: boolean;
  children?: childrenType[];
  meta?: {
    icon?: string;
    title?: string;
    i18n?: boolean;
    showParent?: boolean;
    extraIcon?: {
      svg?: boolean;
      name?: string;
    };
  };
  showTooltip?: boolean;
  parentId?: number;
  pathList?: number[];
};