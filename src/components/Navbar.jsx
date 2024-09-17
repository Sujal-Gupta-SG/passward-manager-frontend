import PropTypes from "prop-types";
import SigninButton from "./SigninButton";

const Navbar = ({
  handleSignOut,
  signInWithGithub,
  signInWithGoogle,
  user,
}) => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* Conditionally render based on authentication state */}
        {user ? (
          <div className="flex items-center">
            <span className="font-bold mx-2">Hello, {user.displayName}</span>
            <button
              onClick={handleSignOut}
              className="text-white bg-red-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1"
            >
              <span className="font-bold px-2">Sign Out</span>
            </button>
          </div>
        ) : (
          <SigninButton
            signInWithGithub={signInWithGithub}
            signInWithGoogle={signInWithGoogle}
          />
        )}
      </div>
    </nav>
  );
};

// PropTypes validation
Navbar.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

export default Navbar;
