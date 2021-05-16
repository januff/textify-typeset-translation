import { useEffect, useState } from "react"

const Translation = ({ page, setPage }) => {

  // https://stackoverflow.com/questions/64956977/image-onload-width-is-undefined

  const [imageLoaded , setImageLoaded ] = useState(false)

  const getDimensions = (url) => {
    var img = new Image();
    img.src = url
    img.onload = () =>  {  
      setPage(page => ({
        ...page,
        width: img.width,
        height: img.height
      }))
    }
    setImageLoaded(true) 
  }

  useEffect(() => {
    setImageLoaded(false)
    if (page.url) {
      getDimensions(page.url)
    }
  }, [page.url]);

  return (
    <div className="translation">
      { imageLoaded &&
        <img 
          src={page.url}
          width={ page.width }
          height={ page.height }
          style={{  
            width: "50vw",
            maxWidth: "45vh",
            maxHeight: "70vh",
            position: 'absolute',
            boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)'
          }}/>
      }
      { imageLoaded ?
        <svg 
          width={ page.width }
          height={ page.height }
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${page.width} ${page.height}`}
          style={{  
            width: "50vw",
            maxWidth: "45vh",
            maxHeight: "70vh",
            position: 'absolute'
          }}>
          {/* <image
            opacity="0.2"
            width={ page.width }
            height={ page.height }
            href={ page.url } /> */}
          { page.text && page.text.words.map((word, i) => (
            <g key={i}>
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
                y={(word.boundingBox.top * 100) + (word.boundingBox.height * 90) + "%"}
                x={(word.boundingBox.left * 100) + ((word.boundingBox.width * 100)/2) + "%"}>
                  {word.text}
              </text>
            </g>
          ))}
        </svg> :
          'Panel Goes Here' 
      }
    </div>  
  )  
}
  
export default Translation