import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


export type UsuarioType = {
  _id: string;
  emailUsuario: string;
  senhaUsuario: string;
};

type UsuarioTypeProp = {
  dados: UsuarioType[] | null;
  setter: React.Dispatch<React.SetStateAction<UsuarioType | null>>;
  selecionado?: UsuarioType | null;
};

export default function TabelaUsuarios({ dados, setter, selecionado }: UsuarioTypeProp) {
  const cabecaTabela = ["ID", "E-mail"];

  return (
    <Table className="text-center min-w-full">
      <TableHeader>
        <TableRow>
          {cabecaTabela.map((entrada, indice) => (
            <TableHead key={indice}>{entrada}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {dados ? (
          dados.map((entrada) => (
            <TableRow
              key={entrada._id}
              onClick={() => setter(entrada)}
              className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                selecionado?._id === entrada._id ? "bg-blue-100" : ""
              }`}
            >
              <TableCell>{entrada._id}</TableCell>
              <TableCell>{entrada.emailUsuario}</TableCell>
              <TableCell>{entrada.senhaUsuario}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell><Skeleton className="h-6 w-full" /></TableCell>
            <TableCell><Skeleton className="h-6 w-full" /></TableCell>
            <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
