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

  // Sign in with GitHub function
  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      const loggedInUser = auth.currentUser;
      toast.success(`Welcome, ${loggedInUser?.displayName || "User"}`);
      console.log(auth);
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
    } catch (error) {
      toast.error(`Google sign-in error: ${error.message}`);
    }
  };

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.info("Signed out successfully");
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
            <Manager user={user} />
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
