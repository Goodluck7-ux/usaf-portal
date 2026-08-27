export default function DocumentListItem({ name, certified }) {
  return (
    <div>
      <li className="flex items-center justify-between py-2.5 text-sm">
        <span className="flex items-center gap-2 text-[#E8ECF4]">
          📄 {name}
        </span>
        {certified && (
          <span className="text-[#4ADE80] text-xs font-medium">Certified</span>
        )}
      </li>

    </div>
  )
}