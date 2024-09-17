import { useRef } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PassForm = ({ user, passwordArray, setPasswordArray, form, setform }) => {
  const ref = useRef();
  const passwordRef = useRef();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eye.png";
    }
  };

  const handleFormCheckAndDelete = async (form) => {
    if (form) {
      try {
        // Form the query parameters for the GET request
        const queryParams = new URLSearchParams({
          site: form.site,
          username: form.username,
          userDisplayName: user.displayName,
          userEmail: user.email,
        }).toString();

        // Make a GET request to check if form data exists in the database
        const getResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/check?${queryParams}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const getResult = await getResponse.json();

        if (getResponse.ok && getResult.exists) {
          const formId = getResult.id; // Assuming the ID of the form is returned

          // Send a DELETE request with the form ID
          const deleteResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/delete/${formId}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (deleteResponse.ok) {
            toast.info("Existing password has been updated.");
          } else {
            toast.error("Error deleting the existing password.");
          }
        }
      } catch (error) {
        console.error("Error occurred while checking or deleting form:", error);
        toast.error("Error checking or deleting the password.");
      }
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        // Check for existing password and delete if found
        await handleFormCheckAndDelete(form);

        // Make a POST request to save the new password
        const postResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/save`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              form,
              user: {
                displayName: user.displayName,
                email: user.email,
              },
            }),
          }
        );
        if (!postResponse.ok) {
          // Read the response body for details
          const errorData = await postResponse.text();
          console.error('Error saving password:', postResponse.status, postResponse.statusText, errorData);
          throw new Error(`Error ${postResponse.status}: ${postResponse.statusText}`);
        }

        if (postResponse.ok) {
          const savedPassword = await postResponse.json();
          setPasswordArray([...passwordArray, savedPassword]);
          setform({ site: "", username: "", password: "" });
          toast.success("Password saved!");
        } else {
          toast.error("Error saving the password.");
        }
      } catch (error) {
        console.error("Error saving password:", error);
        toast.error("Error occurred while saving the password.");
      }
    } else {
      toast.error("Error: Please fill in all fields!");
    }
  };

  return (
    <>
      <div className="flex flex-col p-4 text-black gap-8 items-center">
        <input
          value={form.site}
          onChange={handleChange}
          placeholder="Enter website URL"
          className="rounded-full border border-green-500 w-full p-4 py-1"
          type="text"
          name="site"
          id="site"
        />
        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
          <input
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="username"
            id="username"
          />
          <div className="relative">
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="password"
              name="password"
              id="password"
            />
            <span
              className="absolute right-[3px] top-[4px] cursor-pointer"
              onClick={showPassword}
            >
              <img
                ref={ref}
                className="p-1"
                width={26}
                src="icons/eye.png"
                alt="eye"
              />
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Save
        </button>
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
    </>
  );
};

PassForm.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired, // user.displayName is required
    email: PropTypes.string.isRequired, // user.email is required
  }).isRequired, // user object is required
  passwordArray: PropTypes.arrayOf(
    PropTypes.shape({
      site: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired, // passwordArray is required and should be an array of objects
  setPasswordArray: PropTypes.func.isRequired, // setPasswordArray function is required
  form: PropTypes.shape({
    site: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    id: PropTypes.string,
  }).isRequired, // form object is required
  setform: PropTypes.func.isRequired, // setform function is required
};

export default PassForm;
