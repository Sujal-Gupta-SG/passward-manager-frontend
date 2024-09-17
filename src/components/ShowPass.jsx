import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ShowPass = ({
  passwordArray,
  setPasswordArray,
  setform,
  getPasswords,
}) => {
  const copyText = (text) => {
    toast.info("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  const deletePasswordFinally = async (id) => {
    try {
      // Update the state to remove the deleted item
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      // Send delete request to the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      throw new error("Error in deletePasswordFinally:", error);
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      // Update the UI to remove the deleted password
      let response = await deletePasswordFinally(id);
      if (response.ok) {
        toast.success("Password Deleted!");
      } else {
        toast.error("Error deleting password:", response.statusText);
      }

      getPasswords();
    }
  };

  const editPassword = async (id) => {
    // Find the password object with the matching id
    const passwordToEdit = passwordArray.find((item) => item.id === id);

    // If the password is found, set the form and update the passwordArray
    if (passwordToEdit) {
      let response = await deletePasswordFinally(id);
      if (response.ok) {
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
        toast.info("Password open for editing");
        getPasswords();
      } else {
        toast.error("error");
      }
      setform({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
    } else {
      toast.error("Password with the given id not found");
      // Optionally, show a message to the user if the password isn't found
    }
  };

  return (
    <>
      <div className="passwords">
        <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
        {passwordArray.length === 0 && <div> No passwords to show</div>}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item) => {
                return (
                  <tr key={item.id}>
                    {/* Ensure the key is unique */}
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center ">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center ">
                        <span>{item.username}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center ">
                        <span>
                          {item.password
                            ? "*".repeat(item.password.length)
                            : ""}
                        </span>

                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center py-2 border border-white text-center">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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

ShowPass.propTypes = {
  passwordArray: PropTypes.arrayOf(
    PropTypes.shape({
      site: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired, // passwordArray is required and should be an array of objects
  setPasswordArray: PropTypes.func.isRequired, // setPasswordArray function is required

  setform: PropTypes.func.isRequired, // setform function is required
  getPasswords: PropTypes.func.isRequired,
};

export default ShowPass;
