export default function Logo({ size = 'default' }) {
  const dims = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';

  return (
    <div
      className={`${dims} rounded-full bg-[#D4A73C]/10 border border-[#D4A73C]
                  flex items-center justify-center overflow-hidden shrink-0`}
      aria-label="Portal logo"
    >
      <img
        src="/usaf.png"
        alt="Portal logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}