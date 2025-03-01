import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { LinkIcon } from "@/components/SVG/LinkIcon";
import { centerBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import {
  COLUMN_ID,
  MODAL_TYPE,
  ORDER_TYPE,
  SERVICE_STATE,
  SERVICE_STATE_DISPLAY,
  SERVICE_TYPE,
} from "@/providers/GlobalProvider/enums";
import { Service } from "@/providers/GlobalProvider/serviceType";
import { RowItem } from "@/providers/GlobalProvider/types";
import { getServiceStateDisplay } from "@/providers/GlobalProvider/utils";

import { PrestashopIcon } from "../../components/SVG/PrestashopIcon";
import { WordPressIcon } from "../../components/SVG/WordPressIcon";
import { AdminAccessModal } from "../../containers/AdminAccessModal";
import {
  SVGWrapper,
  ServiceWrapperStyle,
  StatusPoint,
  serviceStatusWrapperStyle,
  tableEmptyStyle,
  tableSortLabelWrapper,
  typoStyle,
} from "./style";
import { LowerCaseOrder } from "./types";
import { formatDate, statusMap, transformRawDatas, useColumns } from "./utils";

export const ServiceTable: FC = () => {
  const {
    displayModals: { adminAccess },
    tableQueryParams,
    setTableQueryParams,
    tableSelected,
    setTableSelected,
    services,
    handleDisplayModal,
  } = useGlobalProvider();
  const { order, page, limit } = tableQueryParams;
  const { t } = useTranslation();
  const rowItems = services?.filteredUsers.length ? transformRawDatas(services.filteredUsers) : [];
  const [adminAccessRow, setAdminAccessRow] = useState<RowItem | null>(null);

  const columns = useColumns();
  const orderBy = COLUMN_ID.NAME;
  const totalCount = services?.globalInfos.totalUsers ?? 0;
  const lowerCaseOrder: LowerCaseOrder = order === ORDER_TYPE.ASC ? "asc" : "desc";

  const handleChangePage = (event: unknown, newPage: number) => {
    setTableQueryParams(prev => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setTableQueryParams(prev => ({ ...prev, limit: newRowsPerPage, page: 0 }));
  };

  const handleSort = () => {
    setTableQueryParams(prev => ({
      ...prev,
      order: prev.order === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC,
    }));
  };

  const isServiceSelectable = (service: Service) => {
    const state = getServiceStateDisplay(service.state);
    return state === SERVICE_STATE_DISPLAY.ACTIVE || state === SERVICE_STATE_DISPLAY.INACTIVE;
  };

  const isItemSelectable = (item: RowItem) => {
    return item.services.some(isServiceSelectable);
  };

  const filterSelectableServices = (item: RowItem): RowItem => {
    return {
      ...item,
      services: item.services.filter(isServiceSelectable),
    };
  };

  const isMetaCheckBoxChecked =
    rowItems.length > 0 && !!tableSelected.length && tableSelected.length === rowItems.filter(isItemSelectable).length;

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rowItems.filter(isItemSelectable).map(filterSelectableServices);
      setTableSelected(newSelected);
      return;
    }
    setTableSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, row: RowItem) => {
    setTableSelected(prev => {
      if (event.target.checked) {
        const filteredRow = filterSelectableServices(row);
        return [...prev, filteredRow];
      } else {
        return prev.filter(item => item.userId !== row.userId);
      }
    });
  };

  const isSelected = (userId: string) => tableSelected.some(item => item.userId === userId);

  const prepareStatusText = (status: SERVICE_STATE): string => {
    const statusDisplay = getServiceStateDisplay(status);
    return t(statusMap[statusDisplay] || "swarm.status.error");
  };

  const handleAdminAccessClick = (row: RowItem): void => {
    setAdminAccessRow(row);
    handleDisplayModal(MODAL_TYPE.ADMIN_ACCESS);
  };

  const handleCloseAdminAccess = (): void => {
    setAdminAccessRow(null);
    handleDisplayModal(MODAL_TYPE.ADMIN_ACCESS);
  };

  const isAdminAccessModalAvailable = (services: Service[]): boolean => {
    return services.some(
      service =>
        getServiceStateDisplay(service.state) === SERVICE_STATE_DISPLAY.ACTIVE ||
        getServiceStateDisplay(service.state) === SERVICE_STATE_DISPLAY.INACTIVE,
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => {
                return (
                  <TableCell
                    key={column.id}
                    style={{ width: column.width }}
                    sortDirection={orderBy === column.id ? lowerCaseOrder : false}>
                    {column.id === COLUMN_ID.SELECT ? (
                      <Checkbox
                        indeterminate={tableSelected.length > 0 && tableSelected.length < rowItems.length}
                        checked={isMetaCheckBoxChecked}
                        onChange={handleSelectAllClick}
                        inputProps={{ "aria-label": "select all services" }}
                      />
                    ) : (
                      <Box sx={tableSortLabelWrapper}>
                        {(() => {
                          if (column.id === COLUMN_ID.NAME) {
                            return (
                              <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? lowerCaseOrder : "asc"}
                                onClick={() => handleSort()}>
                                {column.label}
                              </TableSortLabel>
                            );
                          }
                          if (column.id === COLUMN_ID.SERVICES) {
                            return (
                              <Box sx={{ ...centerBoxStyle, wrap: "nowrap" }}>
                                <Typography sx={{ ...typoStyle, textAlign: "center" }}>{column.label} </Typography>
                                <Box sx={{ width: "1rem" }}>
                                  <LinkIcon />
                                </Box>
                              </Box>
                            );
                          }
                          return <Typography sx={{ ...typoStyle, textAlign: "center" }}>{column.label}</Typography>;
                        })()}
                      </Box>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowItems.map((item, index) => {
              const isSelectable = isItemSelectable(item);
              const isItemSelected = isSelected(item.userId);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={`${item.userId}-${index}`}
                  selected={isItemSelected}>
                  <TableCell sx={{ padding: 0 }} padding="checkbox">
                    {isSelectable && (
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onChange={event => handleClick(event, item)}
                      />
                    )}
                  </TableCell>
                  <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                  <TableCell>{item.className}</TableCell>
                  <TableCell>{item.etabName}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAdminAccessClick(item)}
                      disabled={!isAdminAccessModalAvailable(item.services)}
                      sx={{ width: "100%" }}>
                      <Box sx={ServiceWrapperStyle}>
                        {item.services.map(serviceItem => {
                          const IconComponent =
                            serviceItem.type === SERVICE_TYPE.PRESTASHOP ? PrestashopIcon : WordPressIcon;
                          const isActive =
                            getServiceStateDisplay(serviceItem.state) === SERVICE_STATE_DISPLAY.ACTIVE ||
                            getServiceStateDisplay(serviceItem.state) === SERVICE_STATE_DISPLAY.INACTIVE;
                          return (
                            <SVGWrapper key={serviceItem.id} isActive={isActive}>
                              <IconComponent />
                            </SVGWrapper>
                          );
                        })}
                      </Box>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={ServiceWrapperStyle}>
                      {item.services.map(serviceItem => (
                        <Box key={`${serviceItem.id}-status`} sx={serviceStatusWrapperStyle}>
                          <StatusPoint status={getServiceStateDisplay(serviceItem.state)} />
                          <Typography sx={typoStyle}>{prepareStatusText(serviceItem.state)}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={ServiceWrapperStyle}>
                      {item.services.map(serviceItem => (
                        <Box key={`${serviceItem.id}-date`} sx={serviceStatusWrapperStyle}>
                          {formatDate(serviceItem.deletionDate)}
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!rowItems.length && <Box sx={tableEmptyStyle}>{t("swarm.table.empty")}</Box>}
      </TableContainer>
      {totalCount > 10 && (
        <TablePagination
          labelRowsPerPage={t("swarm.table.rows.per.page")}
          component={"div"}
          rowsPerPageOptions={[10, 25, 50]}
          count={totalCount}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      <AdminAccessModal
        isOpen={adminAccess}
        adminAccessRow={adminAccessRow}
        handleClose={() => handleCloseAdminAccess()}
      />
    </Paper>
  );
};
