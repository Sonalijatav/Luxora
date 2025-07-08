
import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "../styles/CategoryProductStyles.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories - Luxora"}>
      <div className="container py-5">
        <h2 className="text-center text-uppercase fw-bold mb-4">
          Explore by Category
        </h2>
        <div className="row justify-content-center">
          {categories.map((c) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={c._id}>
              <Link to={`/category/${c.slug}`} className="text-decoration-none">
                <div className="category-sticker-card text-center shadow-sm">
                  <div className="sticker-icon mb-3">
                    <img
                      src={`https://img.icons8.com/emoji/96/000000/watch-emoji.png`} // Sticker icon (change if needed)
                      alt="icon"
                      className="sticker-img"
                    />
                  </div>
                  <h5 className="category-name">{c.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useCategory from "../hooks/useCategory";
// import Layout from "../components/Layout/Layout";
// import "../styles/CategoryProductStyles.css";
// const Categories = () => {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div className="container" style={{ marginTop: "100px" }}>
//         <div className="row container">
//           {categories.map((c) => (
//             <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
//               <div className="card">
//                 <Link to={`/category/${c.slug}`} className="btn cat-btn">
//                   {c.name}
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Categories;