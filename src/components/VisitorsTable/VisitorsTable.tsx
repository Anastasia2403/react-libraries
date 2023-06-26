import { useNavigate } from "react-router-dom";
import { Visitor } from "../../types/Visitor";
import { deleteVisitor } from "../../api/visitors";

interface Props {
  visitors: Visitor[];
  value: string | null;
}

export const VisitorsTable: React.FC<Props> = ({
  visitors,
  value,
}) => {
  const navigate = useNavigate();
  
  const handleEditClick = (visitorId: number) => {
    navigate(`/addEditUser?id=${visitorId}`);
  };

  const handleDeleteClick = (visitorId: number) => {
    deleteVisitor(visitorId)
    window.location.reload()
  };
        
  return (
  <table className="table is-striped">
      <thead>
        <tr>
          <th>User name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>TenantId</th>
        </tr>
      </thead>

      <tbody>
        {visitors.map(visitor => (
          <tr key={visitor.id}>
            <td>{visitor.username || '---'}</td>
            <td>{visitor.email || '---'}</td>
            <td>{visitor.phone || '---'}</td>
            <td>{visitor.tenantId || '---'}</td>
            <td>
                <button
                className="button has-background-success-light is-small"
                style={{ marginRight: '10px' }}
                onClick={() => handleEditClick(visitor.id || 0)}
                >
                  Edit
                </button>
              <button
                className="button has-background-danger-light is-small"
                style={{ marginRight: '10px' }}
                onClick={() => handleDeleteClick(visitor.id || 0)}
              >
                  Delete
                  </button>
              <button
                className="button has-background-warning-light is-small"
              >
                Assign book
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   )
}
