import React, { useEffect } from "react"
import { useScan } from "../../hooks";

export const Scan = ({ page, setPage}) => {
  const { status, data: scan, error, isFetching } = useScan(page);
  
  // https://stackoverflow.com/questions/64956977/image-onload-width-is-undefined

  const getDimensions = () => {
    var img = new Image();
    img.src = page.src
    img.onload = () =>  {  
      setPage(page => ({
        ...page,
        width: img.width,
        height: img.height,
        message: 'Save Edits?'
      }))
    }
  }

  useEffect(() => {
    if (page.width === 0) {
      getDimensions()
    }
  }, [page.src]);

  return (
    <div className="scan flex items-center justify-center">
      { page.src &&
        <>
          <img 
            src={ page.src }
            width={ page.width }
            height={ page.height }
            style={{  
              width: "65vw",
              maxWidth: "52vh",
              maxHeight: "65vw",
              position: 'absolute',
              boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)'
            }}/>
          <svg 
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${page.width} ${page.height}`}
            style={{  
              width: "65vw",
              maxWidth: "52vh",
              maxHeight: "65vw",
              position: 'absolute'
            }}>
            {/* <image
              width={ page.width }
              height={ page.height }
              href={ page.src } /> */}
            { page.text && page.text.words.map((word, i) => (
              <g 
                className="transition duration-200 cursor-pointer hover:opacity-10"
                key={i}>
                <rect 
                  fill="yellow"
                  fillOpacity="0.5"
                  width={word.boundingBox.width * page.width}
                  height={word.boundingBox.height * page.height}
                  x={word.boundingBox.left * page.width}
                  y={word.boundingBox.top * page.height} />
                {/* <polygon 
                  fill="black"
                  points={`${word.polygon[0].x * page.width},${word.polygon[0].y * page.height} ${word.polygon[1].x * page.width},${word.polygon[1].y * page.height} ${word.polygon[2].x * page.width},${word.polygon[2].y * page.height} ${word.polygon[3].x * page.width},${word.polygon[3].y * page.height}`}
                /> */}
                <text 
                  fill="red"
                  textAnchor="middle"
                  textLength={word.boundingBox.width * 100 + "%"}
                  fontSize={word.boundingBox.height * page.height + "px"}
                  y={(word.boundingBox.top * 100) + (word.boundingBox.height * 80) + "%"}
                  x={(word.boundingBox.left * 100) + ((word.boundingBox.width * 100)/2) + "%"}>
                    {word.text}
                </text>
              </g>
            ))}
          </svg>
        </>
      }
      { page.message && (
        <span className="text-xs italic bg-gray-300 p-2 self-end">{page.message}</span>
      )}
    </div>  
  )  
}