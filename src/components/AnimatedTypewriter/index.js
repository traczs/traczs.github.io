import React from "react";
import Typewriter from "typewriter-effect";

const AnimatedTypewriter = ({ strings, options }) => {
    return <Typewriter options={{ ...options, strings }} />;
};

export default AnimatedTypewriter;
