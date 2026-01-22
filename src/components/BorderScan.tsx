import { motion } from "framer-motion";

export default function BorderScan() {
  const seg =
    "bg-gradient-to-r from-cyan-400 to-purple-500";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* TOP */}
      <div className="absolute left-4 right-4 top-0 h-[2px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full w-1/3 rounded-full ${seg}`}
          initial={{ x: "-140%" }}
          animate={{ x: "320%" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* RIGHT */}
      <div className="absolute right-0 top-4 bottom-4 w-[2px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="w-full h-1/3 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500"
          initial={{ y: "-140%" }}
          animate={{ y: "320%" }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
            delay: 0.6,
          }}
        />
      </div>

      {/* BOTTOM */}
      <div className="absolute left-4 right-4 bottom-0 h-[2px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full w-1/3 rounded-full ${seg}`}
          initial={{ x: "320%" }}
          animate={{ x: "-140%" }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
            delay: 1.2,
          }}
        />
      </div>

      {/* LEFT */}
      <div className="absolute left-0 top-4 bottom-4 w-[2px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="w-full h-1/3 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400"
          initial={{ y: "320%" }}
          animate={{ y: "-140%" }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
            delay: 1.8,
          }}
        />
      </div>
    </div>
  );
}
