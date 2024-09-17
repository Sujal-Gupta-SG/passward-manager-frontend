import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PassForm from "./PassForm";
import ShowPass from "./ShowPass";

const Manager = ({ user }) => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const getPasswords = async () => {
    try {
      // Make sure to use the correct mode and endpoint
      let req = await fetch(
        `${import.meta.env.VITE_API_URL}?s=${encodeURIComponent(
          user.displayName
        )}&e=${encodeURIComponent(user.email)}`
      );

      if (req.ok) {
        let data = await req.json();

        // Assuming the data format returned from your API is an array
        // and you want to process it accordingly
        const formattedPasswords = data.map((item) => ({
          id: item._id.$oid, // Extract the ObjectId
          site: item.form.site,
          username: item.form.username,
          password: item.form.password,
          displayName: item.user.displayName,
          email: item.user.email,
        }));

        setPasswordArray(formattedPasswords); // Update the password array with the processed data
      } else {
        console.error("Error fetching passwords:", req.statusText);
      }
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  // Fetch passwords when the component mounts
  useEffect(() => {
    if (user?.displayName && user?.email) {
      getPasswords();
    }
  }, [user]); // Make sure useEffect runs only when the user object changes

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-3 md:mycontainer min-h-[88.2vh] ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <PassForm
          user={user}
          passwordArray={passwordArray}
          setPasswordArray={setPasswordArray}
          form={form}
          setform={setform}
        />
        <ShowPass
          user={user}
          passwordArray={passwordArray}
          setPasswordArray={setPasswordArray}
          setform={setform}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      ;
    </>
  );
};
Manager.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired, // displayName is required
    email: PropTypes.string.isRequired, // email is required
  }).isRequired, // user object is required
};
export default Manager;
