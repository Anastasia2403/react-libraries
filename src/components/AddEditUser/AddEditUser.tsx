import { useLocation } from "react-router-dom";
import { Visitor } from "../../types/Visitor";
import { useEffect, useState } from "react";
import { createVisitor, getVisitorById, updateVisitor } from "../../api/visitors";
import { useNavigate } from "react-router-dom";

export const AddEditUser: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const visitorId = searchParams.get("id");
  const tenantId = searchParams.get("tenant");
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isNewVisitor, setIsNewVisitor] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (visitorId) {
      setIsNewVisitor(false);
      getVisitorById(Number(visitorId))
        .then((visitor) => {
          setSelectedVisitor(visitor);
          setEmail(visitor.email || '');
          setUsername(visitor.username || '');
          setPhone(visitor.phone || '');
        })
        .catch(() => {
          alert("Something went wrong");
        });
    }
  }, [visitorId]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleFormSubmit = () => {
  if (!username || !email || !phone) {
    alert("Please fill in all required fields.");
    return;
  }
    
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const visitorData = {
    email,
    username,
    phone,
    tenantId: tenantId || "",
  };

  if (isNewVisitor) {
    createVisitor(visitorData)
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  } else {
    updateVisitor({ ...selectedVisitor, email, username, phone })
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }
};

  return (
    <div className="field-container">
      <div className="field">
        <label className="label">User name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Anastasiia Yuzyfyshyn"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            placeholder="nastya@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Phone number</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="063456798"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Tenant Id</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder=""
            value={selectedVisitor?.tenantId || tenantId || ""}
            readOnly
          />
        </div>
      </div>

      <button
        className="button is-primary"
        type="submit"
        onClick={handleFormSubmit}
      >
        Submit
      </button>
    </div>
  );
};
