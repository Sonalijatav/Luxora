import React from 'react'
import Layout from './../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "65%" }}
          />
        </div>
        <div className="col-md-4">
          <h5>Privacy Policy</h5>
          <p>At Luxora, your privacy is our priority. We collect essential personal information such as your name, contact details, shipping address, and payment information to process your orders and ensure smooth delivery. Additionally, we may collect technical data like IP addresses and browsing behavior to enhance your shopping experience.</p>
          <p>Your data is used strictly for order processing, customer support, improving our services, and sharing updates or offers (only if you opt-in). We do not sell your information to third parties. However, we may share it with trusted partners like delivery services or payment gateways, strictly for fulfilling your purchases.</p>
          <p>We are committed to keeping your information secure through industry-standard measures. You have the right to access, update, or request the deletion of your data. By using our website, you agree to our privacy practices. For any privacy concerns, contact us at support@luxora.com.</p>
         
        </div>
      </div>
    </Layout>
  );
};

export default Policy;