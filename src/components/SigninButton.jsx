import PropTypes from "prop-types";

const SigninButton = ({ signInWithGithub, signInWithGoogle }) => {
  return (
    <div className="flex flex-row">
      <button
        onClick={signInWithGithub}
        className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1"
      >
        <img
          className="invert w-10 p-1"
          src="/icons/github.svg"
          alt="GitHub logo"
        />
        <span className="font-bold px-2">GitHub</span>
      </button>

      <button
        onClick={signInWithGoogle}
        className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1"
      >
        <img
          className="invert w-10 p-1"
          src="/icons/google.svg"
          alt="Google logo"
        />
        <span className="font-bold px-2">Google</span>
      </button>
    </div>
  );
};

SigninButton.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
};

export default SigninButton;
