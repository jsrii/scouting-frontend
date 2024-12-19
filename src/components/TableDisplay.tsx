import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  ScrollShadow,
} from "@nextui-org/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface TableDisplayProps {
  deleteDialog: Element;
}

const columns = [
  { name: "TEAM NUMBER", uid: "teamNumber" },
  { name: "ABILITY 1", uid: "ab1Rating" },
  { name: "ABILITY 2", uid: "ab2Rating" },
  { name: "ABILITY 3", uid: "ab3Rating" },
  { name: "STRENGTHS", uid: "strengths" },
  { name: "WEAKNESSES", uid: "weaknesses" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TableDisplay() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "teamNumber":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.institution}
            name={cellValue}
          ></User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Team data">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Team">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-red-500">
                    <DeleteIcon />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the following team, and will not be able to be recovered.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => console.log("Delete: " + user.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Tooltip>
          </div>
        );
      case "strengths":
        return (
          <ScrollShadow
            orientation="horizontal"
            className="max-w-[150px] max-h-[100px]"
            hideScrollBar
          >
            <div className="flex gap-1">
              {user.strengths.map((strength, index) => (
                <Chip key={index} color="default">
                  {strength}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
        );
      case "weaknesses":
        return (
          <ScrollShadow
            orientation="horizontal"
            className="max-w-[150px] max-h-[100px]"
            hideScrollBar
          >
            <div className="flex gap-1">
              {user.weaknesses.map((weaknesses, index) => (
                <Chip key={index} color="default">
                  {weaknesses}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      isHeaderSticky
      aria-label="table of teams"
      className="teamTableClass"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={teams}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
