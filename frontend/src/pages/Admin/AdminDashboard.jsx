import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard - Luxora"}>
      <div className="container-fluid py-4 px-3 dashboard">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="card shadow-sm border-0 p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
              <h4 className="mb-4 text-uppercase fw-semibold text-dark">
                Admin Information
              </h4>
              <hr />
              <p className="mb-3">
                <strong className="text-secondary">Name:</strong>{" "}
                <span className="text-dark">{auth?.user?.name}</span>
              </p>
              <p className="mb-3">
                <strong className="text-secondary">Email:</strong>{" "}
                <span className="text-dark">{auth?.user?.email}</span>
              </p>
              <p className="mb-0">
                <strong className="text-secondary">Contact:</strong>{" "}
                <span className="text-dark">{auth?.user?.phone}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;






// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// const AdminDashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout>
//       <div className="container-fluid m-3 p-3 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3> Admin Name : {auth?.user?.name}</h3>
//               <h3> Admin Email : {auth?.user?.email}</h3>
//               <h3> Admin Contact : {auth?.user?.phone}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;