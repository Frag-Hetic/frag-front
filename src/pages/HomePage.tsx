import { useState } from "react";
import { FileUploadModal } from "@/components/files/upload/FileUploadModal";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  Github,
  Flame,
  Swords,
  Zap,
  SplitSquareHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import ChunkNorrisImage from "@/assets/images/chunk-norris.webp";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const chunkNorrisFacts = [
  "Chunk Norris can compress a file to -1 bytes.",
  "Chunk Norris doesn't split files, files split themselves out of fear.",
  "Chunk Norris can download files before they're uploaded.",
  "When Chunk Norris does a roundhouse kick, he creates perfect chunks.",
  "Chunk Norris's beard contains infinite compression algorithms.",
  "Chunk Norris can compress air into a black hole.",
  "Chunk Norris's chunks are so perfect, they compress themselves.",
  "Chunk Norris can compress infinity into a byte.",
  "When Chunk Norris uploads a file, the server downloads in fear.",
  "Chunk Norris's compression ratio is over 9000%.",
  "Chunk Norris can compress a file by staring at it.",
  "Chunk Norris's roundhouse kick is the ultimate hash function.",
  "Chunk Norris doesn't need algorithms, algorithms need Chunk Norris.",
  "Chunk Norris can compress a file without losing any data... twice.",
  "Chunk Norris's code doesn't need comments, it comments itself out of respect.",
  "Chunk Norris can compile binary by roundhouse kicking the source code.",
  "Chunk Norris's chunks are so efficient, they occupy negative space.",
  "Chunk Norris can compress a void into a smaller void.",
  "When Chunk Norris merges chunks, they thank him.",
  "Chunk Norris's compression algorithm is just 'Be smaller... or else.'",
] as const;

function HomePage() {
  const [isKicking, setIsKicking] = useState(false);
  const [factIndex, setFactIndex] = useState(() =>
    Math.floor(Math.random() * chunkNorrisFacts.length)
  );

  const handleChunkClick = () => {
    if (isKicking) return;
    setIsKicking(true);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * chunkNorrisFacts.length);
    } while (newIndex === factIndex);
    setFactIndex(newIndex);
    setTimeout(() => setIsKicking(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 text-center">
        <div
          className="relative w-32 h-32 mb-12 group"
          onClick={handleChunkClick}
        >
          {/* Removed Flame Effect */}

          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />

          {/* Chunk Image */}
          <img
            src={ChunkNorrisImage}
            alt="Chunk Norris"
            className={cn(
              "w-full h-full object-cover rounded-full shadow-lg border-2 border-primary/20",
              "transform transition-all duration-1000 cursor-pointer",
              "group-hover:scale-110 group-hover:rotate-3",
              isKicking && "animate-[kick_0.5s_ease-in-out]"
            )}
          />

          {/* Executable Badge */}
          <Badge
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 
                         bg-background/80 backdrop-blur-sm border border-border 
                         rounded-full px-3 py-1"
          >
            <code className="text-xs font-mono text-muted-foreground">
              chunk_norris.exe
            </code>
          </Badge>

          <div
            className={cn(
              "absolute -bottom-14 left-1/2 -translate-x-1/2 w-max max-w-[250px]",
              "bg-black/80 text-white px-4 py-2 rounded-lg text-sm",
              "transform transition-all duration-700",
              isKicking
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
          >
            <Flame className="inline-block w-4 h-4 mr-2 text-orange-500" />
            <span className="font-mono">{chunkNorrisFacts[factIndex]}</span>
          </div>
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Meet{" "}
            <span className="text-primary underline decoration-wavy decoration-primary/30">
              Norris
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            The Chuck Norris of file compression. Roundhouse kicks your files
            into smaller chunks with unmatched precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group flex flex-col items-center"
            >
              <feature.icon className="w-6 h-6 text-primary mb-2 group-hover:animate-bounce" />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <FileUploadModal />
          <Link to="/files">
            <Button variant="outline">
              <FileIcon className="mr-2 h-4 w-4" />
              View Files
            </Button>
          </Link>
          <Button variant="ghost" asChild>
            <a
              href="https://github.com/frag-hetic/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>
          They say Chuck Norris can divide by zero. Norris can compress a file
          to 0 bytes.
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Roundhouse Compression",
    description: "Splits files with the precision of a martial arts master",
    icon: Swords,
  },
  {
    title: "Lightning Fast",
    description:
      "Processes files faster than Chunk Norris can count to infinity",
    icon: Zap,
  },
  {
    title: "Delta Force Deduplication",
    description: "Elite-level chunk detection and deduplication",
    icon: SplitSquareHorizontal,
  },
] as const;

export default HomePage;
