import {
  Box,
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
import Link from "next/link";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";

import { LinkIcon } from "@/components/SVG/LinkIcon";
import { centerBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import {
  COLUMN_ID,
  ORDER_TYPE,
  SERVICE_STATE,
  SERVICE_STATE_DISPLAY,
  SERVICE_TYPE,
} from "@/providers/GlobalProvider/enums";
import { RowItem } from "@/providers/GlobalProvider/types";
import { getServiceStateDisplay } from "@/providers/GlobalProvider/utils";

import { PrestashopIcon } from "../../components/SVG/PrestashopIcon";
import { WordPressIcon } from "../../components/SVG/WordPressIcon";
import {
  SVGWrapper,
  ServiceWrapperStyle,
  StatusPoint,
  serviceStatusWrapperStyle,
  tableSortLabelWrapper,
  typoStyle,
} from "./style";
import { LowerCaseOrder } from "./types";
import { formatDate, transformRawDatas, useColumns } from "./utils";

export const ServiceTable: FC = () => {
  const { tableQueryParams, setTableQueryParams, tableSelected, setTableSelected, services } = useGlobalProvider();
  const { order, page, limit } = tableQueryParams;
  const { t } = useTranslation();
  const rowItems = services?.filteredUsers.length ? transformRawDatas(services.filteredUsers) : [];

  const columns = useColumns();
  const orderBy = COLUMN_ID.NAME;
  const totalCount = services?.globalInfos.totalUsers ?? 0;
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

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rowItems;
      setTableSelected(newSelected);
      return;
    }
    setTableSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, row: RowItem) => {
    setTableSelected(prev => (event.target.checked ? [...prev, row] : prev.filter(item => item.userId !== row.userId)));
  };

  const isSelected = (userId: string) => tableSelected.some(item => item.userId === userId);

  const prepareStatusText = (status: SERVICE_STATE) => {
    if (getServiceStateDisplay(status) === SERVICE_STATE_DISPLAY.ACTIVE) return t("swarm.status.active");
    if (getServiceStateDisplay(status) === SERVICE_STATE_DISPLAY.INACTIVE) return t("swarm.status.inactive");
    return t("swarm.status.waiting");
  };
  const lowerCaseOrder: LowerCaseOrder = order === ORDER_TYPE.ASC ? "asc" : "desc";

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
                        checked={rowItems.length > 0 && tableSelected.length === rowItems.length}
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                      onChange={event => handleClick(event, item)}
                    />
                  </TableCell>
                  <TableCell>{`${item.lastName} ${item.firstName}`}</TableCell>
                  <TableCell>{item.className}</TableCell>
                  <TableCell>{item.etabName}</TableCell>
                  <TableCell>
                    <Box sx={ServiceWrapperStyle}>
                      {item.services.map(serviceItem => {
                        const IconComponent =
                          serviceItem.type === SERVICE_TYPE.PRESTASHOP ? PrestashopIcon : WordPressIcon;
                        const isActive = getServiceStateDisplay(serviceItem.state) !== SERVICE_STATE_DISPLAY.WAITING;
                        return isActive ? (
                          <Link
                            key={serviceItem.id}
                            href={serviceItem.serviceName}
                            target="_blank"
                            rel="noopener noreferrer">
                            <SVGWrapper isActive={true}>
                              <IconComponent />
                            </SVGWrapper>
                          </Link>
                        ) : (
                          <SVGWrapper key={serviceItem.id} isActive={false}>
                            <IconComponent />
                          </SVGWrapper>
                        );
                      })}
                    </Box>
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
            {!rowItems.length && <TableCell>{t("swarm.table.empty")}</TableCell>}
          </TableBody>
        </Table>
      </TableContainer>
      {totalCount > 10 && (
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[10, 25, 50]}
          count={totalCount}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};
