export const Previous = ({ scans, page, setPage }) => {
  return (
    <div className="previous overflow-y-scroll p-1 sm:p-2">
      <span className="bg-gray-700 p-1 px-2 mb-1 rounded-sm text-xs sm:text-sm align-self-start text-white">Saved</span>
      <ul className="grid grid-cols-1 gap-2 sm:gap-3.5 p-0.5">
        { scans && scans.map((scan) => (
          <li 
            key={scan.name}
            onClick={() => setPage({...scan})}>
              {scan.name && (
                <img 
                  src={scan.src}
                  style={{width:'80px'}} 
                  className={`${scan.name == page.name ? "border-red-500" : "border-gray-600 cursor-pointer"} hover:border-red-500 border-4 border-solid`} />
                )
              }
          </li>
        ))}
      </ul>
    </div>
  )  
}