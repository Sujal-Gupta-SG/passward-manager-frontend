import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Manager from "./components/Manager";
import SigninButton from "./components/SigninButton";

function App() {
  const [user, setUser] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
          id: item._id, // Extract the ObjectId
          site: item.form.site,
          username: item.form.username,
          password: item.form.password,
          displayName: item.user.displayName,
          email: item.user.email,
        }));

        setPasswordArray(formattedPasswords); // Update the password array with the processed data
      } else {
        toast.error("Error fetching passwords:", req.statusText);
      }
    } catch (error) {
      toast.error("Error fetching passwords:", error);
    }
  };

  // Fetch passwords when the component mounts
  useEffect(() => {
    if (user?.displayName && user?.email) {
      getPasswords();
    }
  }, [user]);

  // Sign in with GitHub function
  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      const loggedInUser = auth.currentUser;
      toast.success(`Welcome, ${loggedInUser?.displayName || "User"}`);
      getPasswords();
    } catch (error) {
      toast.error(`GitHub sign-in error: ${error.message}`);
    }
  };

  // Sign in with Google function
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const loggedInUser = auth.currentUser;
      toast.success(`Welcome, ${loggedInUser?.displayName || "User"}`);
      getPasswords();
    } catch (error) {
      toast.error(`Google sign-in error: ${error.message}`);
    }
  };

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.info("Signed out successfully");
      setPasswordArray([]);
    } catch (error) {
      toast.error(`Sign-out error: ${error.message}`);
    }
  };

  useEffect(() => {
    setShowOverlay(!user); // Show the overlay when no user is signed in
  }, [user]);

  const handleBlurClick = () => {
    if (!user) {
      toast.error("Please sign in first to use this feature.");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          handleSignOut={handleSignOut}
          signInWithGithub={signInWithGithub}
          signInWithGoogle={signInWithGoogle}
          user={user}
        />

        <main className="flex-grow">
          {user ? (
            <Manager
              user={user}
              passwordArray={passwordArray}
              setPasswordArray={setPasswordArray}
              getPasswords={getPasswords}
            />
          ) : (
            <div>Please sign in to continue</div>
          )}{" "}
          {/* Conditional rendering */}
          {showOverlay && (
            <div
              className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
              onClick={handleBlurClick}
            >
              <SigninButton
                signInWithGithub={signInWithGithub}
                signInWithGoogle={signInWithGoogle}
              />
            </div>
          )}
        </main>
        <Footer />
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
      </div>
    </>
  );
}

export default App;
