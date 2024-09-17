const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white flex flex-col justify-center items-center w-full py-4 mt-auto">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500"> &lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with{" "}
        <img className="w-7 mx-2" src="/icons/heart.png" alt="Heart Icon" /> by
        Sujal
      </div>
    </footer>
  );
};

export default Footer;
