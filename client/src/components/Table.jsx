import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { format } from "date-fns";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper ">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{format(new Date(row.dob), "MM/dd/yyyy")}</td> {/* Format date using date-fns */}
              <td>{row.gender}</td>
              <td className="fit">
                <span className="actions">
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => deleteRow(row.id)}
                  />
                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={() => editRow(row.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
