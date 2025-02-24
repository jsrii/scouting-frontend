import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Tooltip,
  ScrollShadow,
  Chip,
  User,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
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

interface TeamTableProps {
  deleteFunction: Function;
  editFunction: Function;
}

type TableRow = {
  id: number;
  teamNum: number;
  ab1: number;
  ab2: number;
  ab3: number;
  strengths: string;
  weaknesses: string;
  botImage: string;
  institution: string;
  userName: string | null;
};

export default function App({ deleteFunction, editFunction }: TeamTableProps) {
  const queryParameters = new URLSearchParams(window.location.search);
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/getteams`, {
        signal,
        mode: "cors",
        headers: {
          "Event-Name": queryParameters.get("eventname") ?? "",
          "Api-Key": `${import.meta.env.VITE_BACKEND_API_KEY}`,
        },
      });

      let json = await res.json();
      setIsLoading(false);
      console.log(json);
      return {
        items: json[0],
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a : any, b : any) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  function emptyOrNot() {
    if (list.items.length === 0) {
      return <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>;
    } else {
      return (
        <TableBody
          items={list.items as TableRow[]} // Cast items to TableRow[]
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: TableRow) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      );
    }
  }
  

  const renderCell = React.useCallback(
    (item: TableRow, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof typeof item];

      switch (columnKey) {
        case "teamNum":
          return (
            <User
              avatarProps={{ radius: "lg", src: item.botImage }}
              description={item.institution ? item.institution : cellValue}
              name={cellValue}
            >
              {cellValue}
            </User>
          );
        case "strengths":
          return (
            <ScrollShadow
              orientation="horizontal"
              className="max-w-[150px] max-h-[100px]"
              hideScrollBar
            >
              <div className="flex gap-1">
                {JSON.parse(item.strengths).map((strength : JSON[], index: number) => (
                  <Chip key={index} color="default">
                    {`${strength}`}
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
                {JSON.parse(item.weaknesses).map((weaknesses: JSON[], index: number) => (
                  <Chip key={index} color="default">
                    {`${weaknesses}`}
                  </Chip>
                ))}
              </div>
            </ScrollShadow>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit Team data">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => editFunction(item.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-red-500">
                    <Tooltip color="danger" content="Delete Team">
                      <DeleteIcon />
                    </Tooltip>
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
                    <AlertDialogAction onClick={() => deleteFunction(item.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      isHeaderSticky
      aria-label="table of teams"
      className="teamTableClass"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader>
        <TableColumn key="teamNum">Team Number</TableColumn>
        <TableColumn key="ab1" allowsSorting>
          Ability 1
        </TableColumn>
        <TableColumn key="ab2" allowsSorting>
          Ability 2
        </TableColumn>
        <TableColumn key="ab3" allowsSorting>
          Ability 3
        </TableColumn>
        <TableColumn key="strengths">Strengths</TableColumn>
        <TableColumn key="weaknesses">Weaknesses</TableColumn>
        <TableColumn key="actions">Actions</TableColumn>
      </TableHeader>
      {emptyOrNot()}
    </Table>
  );
}
