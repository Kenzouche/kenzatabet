import { motion } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ toEmail }: { toEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mrepbpwo", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
      {/* To */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm">
        <span className="w-14 text-white/50">To</span>
        <span className="font-mono text-white/80">{toEmail}</span>
      </div>

      {/* From */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm">
        <span className="w-14 text-white/50">From</span>
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
        />
      </div>

      {/* Subject */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm">
        <span className="w-14 text-white/50">Subject</span>
        <input
          type="text"
          name="subject"
          required
          placeholder="Sujet du message"
          className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        rows={6}
        required
        placeholder="Écris ton message ici..."
        className="mt-2 w-full resize-none bg-transparent text-white outline-none placeholder:text-white/30"
      />

      {/* Status */}
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-cyan-400"
        >
          Message envoyé avec succès ✨
        </motion.p>
      )}

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          Une erreur est survenue. Réessaie plus tard.
        </motion.p>
      )}

      {/* Submit */}
      <div className="flex justify-end pt-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2
                      font-semibold text-black transition
                      ${status === "sending" ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {status === "sending" ? "Envoi..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
