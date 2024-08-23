export enum CURRENTTAB_STATE {
  MAIN = "main",
  STATS = "stats",
}
export enum SERVICE_TYPE {
  PRESTASHOP = "prestashop",
  WORDPRESS = "wordpress",
}
export enum SERVICE_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  WAITING = "waiting",
}

export enum COLUMN_ID {
  SELECT = "select",
  NAME = "name",
  CLASS = "class",
  ETAB = "etab",
  SERVICES = "services",
  STATUS = "status",
  SUPRESSDATE = "supressDate",
}

export enum SORT {
  ASC = "asc",
  DESC = "desc",
}

export enum MODAL_TYPE {
  CREATE = "createServices",
  DELETE = "deleteServices",
  CONFIRMATION = "confirmation",
  SEND = "sendServices",
  TOGGLE_STATUS = "toggleStatusServices",
  REINIT = "reinitServices",
}
