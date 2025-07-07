import React from 'react'
import Layout from './../components/Layout/Layout'


const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.jpg"
            alt="contactus"
            style={{ width: "69.3%" }}
          />
        </div>
        <div className="col-md-4">
          <h6>About Us <br/>
Welcome to Luxora – Time Redefined.
</h6>
          <p className="text-justify mt-2">
          
At Luxora, we believe that time is more than just numbers on a dial — it's a statement of style, precision, and personality. As a proud homegrown brand, Luxora is your one-stop destination for premium watches, stylish clocks, and timekeeping essentials for every space and occasion.

Whether you're searching for elegant wristwatches, smart watches, designer wall clocks, or classic table clocks, Luxora offers a curated collection to suit every taste and lifestyle. Our wide range includes timeless designs, modern innovations, and reliable functionality — all backed by our commitment to quality and customer satisfaction.

We are more than just an e-commerce platform — Luxora is a brand that celebrates craftsmanship, punctuality, and personal expression. Whether you're gifting a loved one, upgrading your collection, or decorating your space, we are here to help you find the perfect timepiece.

Thank you for choosing Luxora — Where Time Meets Style.


          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;