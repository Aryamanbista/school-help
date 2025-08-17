import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const HomePage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="text-center"
    >
      <h1 className="text-4xl font-bold">Welcome to SchoolHelp</h1>
      <p className="mt-4">Connecting schools with volunteers.</p>
    </motion.div>
  );
};
export default HomePage;
