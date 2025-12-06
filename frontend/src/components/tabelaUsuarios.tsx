import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export type UsuarioType = {
  _id: string;
  emailUsuario: string;
};

type UsuarioTypeProp = {
  dados: UsuarioType[] | null;
  setter: React.Dispatch<React.SetStateAction<UsuarioType | null>>;
  selecionado?: UsuarioType | null;
};

export default function TabelaUsuarios({
  dados,
  setter,
  selecionado,
}: UsuarioTypeProp) {
  const cabecaTabela = ["ID", "E-mail"];

  return (
    <Table className="min-w-full rounded-xl overflow-hidden">
      <TableHeader>
        <TableRow className="bg-gray-100">
          {cabecaTabela.map((entrada, indice) => (
            <TableHead
              key={indice}
              className="text-gray-700 font-semibold py-3 text-center"
            >
              {entrada}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {dados ? (
          dados.map((entrada) => (
            <TableRow
              key={entrada._id}
              onClick={() => setter(entrada)}
              className={`
                cursor-pointer 
                transition-colors
                hover:bg-gray-50 
                ${selecionado?._id === entrada._id ? "bg-blue-100" : ""}
              `}
            >
              <TableCell className="py-3 text-gray-700 text-center">
                {entrada._id}
              </TableCell>

              <TableCell className="py-3 text-gray-700 text-center">
                {entrada.emailUsuario}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            {Array.from({ length: 2 }).map((_, i) => (
              <TableCell key={i} className="py-3">
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
