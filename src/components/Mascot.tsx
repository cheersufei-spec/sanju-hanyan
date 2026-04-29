type MascotProps = {
  compact?: boolean;
};

export default function Mascot({ compact = false }: MascotProps) {
  const size = compact ? "h-12 w-12" : "h-52 w-52 sm:h-64 sm:w-64";

  return (
    <div className={`relative ${size} floaty`} aria-hidden="true">
      <img
        src="/fox-mascot.png"
        alt=""
        className="h-full w-full object-contain drop-shadow-xl"
        draggable={false}
      />
    </div>
  );
}
