import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
  
  import  { Toaster } from 'react-hot-toast';
const Layout = ({children, title, description,keywords, author}) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                  <meta name="description" content={description} />
                  <meta name="keywords" content={keywords} />
                  <meta name="author" content={author} /> 
      
                <title>{title}</title>
      </Helmet>


      <Header/>
      <main style={{minHeight: "70vh"}}>{children}</main>
      <Toaster/>
      <Footer/>
    </div>
  )
}

//for seo
// agr y values nhi privide ki toh yha se default le lega
Layout.defaultProps = {
  title : 'Luxora --shop your favorite watch now',
  description:'mern-stack project',
  keywords: 'mern,react, node, mongodb',
  author:'Sonali',
}
export default Layout