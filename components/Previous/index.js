import React, { useEffect } from 'react'
import { useScans } from "../../hooks";

export const Previous = ({ page, setPage }) => {
  const { data, isLoading, isFetching } = useScans()
  // console.log('data in Prev component: ', data)

  return (
    <div className="previous overflow-y-scroll p-1">
      <span className="align-self-start text-white">History</span>
      <ul className="grid grid-cols-2 gap-3 p-1">
        { data && data.map((scan) => (
          <li 
            key={scan.name}
            onClick={() => setPage({...scan})}>
              {scan.name && (
                <img 
                  src={scan.src}
                  style={{width:'80px'}} 
                  className={`${scan.name == page.name ? "border-red-500" : "border-gray-600"} hover:border-red-500 border-4 border-solid`} />
                )
              }
          </li>
        ))}
      </ul>
    </div>
  )  
}