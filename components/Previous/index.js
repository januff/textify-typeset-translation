import React, { useEffect } from 'react'
import { useScans } from "../../hooks";

export const Previous = ({ page, setPage }) => {
  const { data, isLoading, isFetching } = useScans()
  // console.log('data in Prev component: ', data)

  return (
    <div className="previous overflow-y-scroll p-1 sm:p-2">
      <span className="text-xs sm:text-sm align-self-start text-white">Saved</span>
      <ul className="grid grid-cols-1 gap-1.5 sm:gap-3 p-0.5">
        { data && data.map((scan) => (
          <li 
            key={scan.name}
            onClick={() => setPage({...scan})}>
              {scan.name && (
                <img 
                  src={scan.src}
                  style={{width:'80px'}} 
                  className={`${scan.name == page.name ? "border-red-500" : "border-gray-600"} hover:border-red-500 border-2 border-solid`} />
                )
              }
          </li>
        ))}
      </ul>
    </div>
  )  
}