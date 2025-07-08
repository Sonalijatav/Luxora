

import React from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={'Dashboard - Luxora'}>
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card p-4 border-0 shadow-sm"
              style={{ backgroundColor: '#f8f9fa', color: '#212529' }}
            >
              <h4 className="mb-4 fw-semibold text-uppercase text-dark">
                User Information
              </h4>
              <hr />
              <div className="mb-3">
                <strong className="text-secondary">Name: </strong>
                <span className="text-dark">{auth?.user?.name}</span>
              </div>
              <div className="mb-3">
                <strong className="text-secondary">Email: </strong>
                <span className="text-dark">{auth?.user?.email}</span>
              </div>
              <div className="mb-3">
                <strong className="text-secondary">Address: </strong>
                <span className="text-dark">{auth?.user?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;





// import React from 'react'
// import UserMenu from '../../components/Layout/UserMenu'
// import Layout from '../../components/Layout/Layout'
// import { useAuth } from '../../context/auth'

// const Dashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout title={'Dashboard - luxora'}>
//         <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu/>
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3>{auth?.user?.name}</h3>
//               <h3>{auth?.user?.email}</h3>
//               <h3>{auth?.user?.address}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Dashboard