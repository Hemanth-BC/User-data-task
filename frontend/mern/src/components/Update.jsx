import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleData = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();

    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
      setImage(result.image);
    }
    if (!response.ok) {
      setError(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    if (image) formData.append("image", image);

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    } else {
      setName("");
      setEmail("");
      setAge(0);
      setImage(null);
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">Edit User</h2>
      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
