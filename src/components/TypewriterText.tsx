import { Typewriter } from "react-simple-typewriter";

export default function TypewriterText({
  text = "",
  speed = 40,
  className = "",
}) {
  return (
    <div className={` font-mono ${className}`}>
      <Typewriter
        words={[text]}
        loop={Infinity}
        typeSpeed={speed}
        deleteSpeed={speed}
        delaySpeed={1000}
        cursor
        cursorStyle="|"
      />
    </div>
  );
}
