import React, { useEffect } from "react"
import Image from 'next/image'
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
    <div 
      onClick={() => setPage({ 
        message: 'Choose or Upload Image',
        saved: false
      })}
      className="scan flex justify-center items-center">
      {
        !page.src &&
          <div className="intro text-yellow-500 text-right w-4/5 h-4/5 bg-gray-800 flex justify-end items-start p-5" style={{  
            boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)'
          }}>
            <div className="toolkit leading-loose text-xs">
              <span className="text-lg italic">BUILT WITH</span><br></br> 
              NEXT.JS <img className="inline-block" width="20" height="20" src="/images/next-js.svg" /><br></br>
              React-Query <img className="inline-block" width="20" height="20" src="/images/react-query.svg" /><br></br>
              AWS PREDICTIONS <img className="inline-block" width="20" height="20" src="/images/aws-amplify-logo.png" /><br></br>
              Apache Cassandra <img className="inline-block" width="20" height="20" src="/images/cassandra-color.svg" /><br></br>
              React-Easy-Edit <img className="inline-block" width="16" height="16" src="/images/edit.svg" /><br></br> 
              TailwindCSS <img className="inline-block" width="20" height="20" src="/images/tailwindcss.svg" /><br></br> 
            </div>
            <div className="text-gray-200 text-xs sm:text-sm self-end justify-self-start absolute w-2/5 md:w-1/3">
              A translation tool for the global comic book multiverse, as <a className=" text-yellow-500 italic" href="https://joeyanuff-33180.medium.com/" target="_blank">tutorialized on Medium</a>. <a href="https://joeyanuff-33180.medium.com/" target="_blank"><img className="inline-block" width="12" height="12" style={{filter: 'invert(1)'}} src="/images/medium.png" /></a> Ready-to-clone at Github. <a href="https://github.com/januff/textify-typeset-translation" target="_blank"><img className="inline-block" width="12" height="12" src="/images/github.svg" /></a>
            </div>
          </div>
      }
      { page.src &&
        <>
          <img 
            src={ page.src }
            className="relative max-w-xs sm:max-w-lg"
            style={{  
              boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)'
            }}/>
          <svg 
            className="absolute max-w-xs sm:max-w-lg"
            preserveAspectRatio="xMidYMid meet"
            onClick={(e) => e.stopPropagation()}
            viewBox={`0 0 ${page.width} ${page.height}`}>
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
        <span className="message absolute text-xs italic bg-gray-300 p-2 self-end">{page.message}</span>
      )}
    </div>  
  )  
}