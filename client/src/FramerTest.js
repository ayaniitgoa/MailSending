import React, { useState } from "react";
import { motion } from "framer-motion";

function FramerTest() {
  const [showText, setShowText] = useState(false);
  return (
    <div className="">
      <motion.h3 animate={{ fontSize: "50px" }}>Hello</motion.h3>
      <motion.button
        style={{ marginLeft: 10 }}
        initial={{ opacity: 0 }}
        animate={{ scale: 1.5, opacity: 1 }}
        onClick={(e) => {
          setShowText(!showText);
        }}
      >
        Hello
      </motion.button>
      {showText && (
        <motion.h1
          style={{
            position: "relative",
            right: "-45vw",
          }}
          initial={{ x: "-60vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "tween" }}
        >
          Ssssssssup
        </motion.h1>
      )}
    </div>
  );
}

export default FramerTest;
