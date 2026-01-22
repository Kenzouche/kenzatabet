// src/components/ProjectCard.tsx
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, CardFooter, Chip, Button } from "@heroui/react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
};

function isNonEmptyUrl(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

export default function ProjectCard({ project }: { project: Project }) {
  const hasLive = isNonEmptyUrl(project.href);
  const hasRepo = isNonEmptyUrl(project.repo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group h-full"
    >
      <Card
        className="
          relative h-full overflow-hidden
          border border-violet-500/25 bg-zinc-950/60
          shadow-[0_0_0_1px_rgba(168,85,247,0.12),0_0_30px_rgba(168,85,247,0.10)]
          backdrop-blur-xl
          transition
          group-hover:border-violet-400/40
          group-hover:shadow-[0_0_0_1px_rgba(168,85,247,0.18),0_0_45px_rgba(168,85,247,0.18)]
        "
      >
        {/* Glow overlay */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300
            group-hover:opacity-100
            bg-[radial-gradient(600px_circle_at_30%_20%,rgba(168,85,247,0.22),transparent_55%)]
          "
        />

        <CardHeader className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-300/80">
              {project.description}
            </p>
          </div>

          {project.featured ? (
            <span
              className="
                shrink-0 rounded-full px-2.5 py-1 text-xs font-medium
                text-violet-100
                bg-violet-500/15 border border-violet-400/25
                shadow-[0_0_18px_rgba(168,85,247,0.25)]
              "
            >
              Featured
            </span>
          ) : null}
        </CardHeader>

        <CardBody className="pt-0">
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <Chip
                key={tag}
                size="sm"
                variant="flat"
                classNames={{
                  base:
                    "bg-violet-500/10 border border-violet-400/20 text-violet-100 shadow-[0_0_16px_rgba(168,85,247,0.10)]",
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </CardBody>

        <CardFooter className="flex gap-2">
          <Button
            as="a"
            href={hasLive ? project.href : undefined}
            target={hasLive ? "_blank" : undefined}
            rel={hasLive ? "noreferrer" : undefined}
            radius="full"
            size="sm"
            variant="flat"
            isDisabled={!hasLive}
            className="
              bg-violet-500/10 text-violet-100 border border-violet-400/20
              hover:bg-violet-500/15
            "
          >
            Live
          </Button>

          <Button
            as="a"
            href={hasRepo ? project.repo : undefined}
            target={hasRepo ? "_blank" : undefined}
            rel={hasRepo ? "noreferrer" : undefined}
            radius="full"
            size="sm"
            variant="bordered"
            isDisabled={!hasRepo}
            className="
              border-violet-400/25 text-zinc-100
              hover:bg-violet-500/10
            "
          >
            Repo
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
