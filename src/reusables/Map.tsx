// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useEffect, useState } from "react"
import * as d3 from "d3"
import geojson from "@/data/states.geo.json"
import { Box } from "@chakra-ui/react"
import { GeoJsonProperties } from "geojson"

const pathGenerator = (
  [width, height]: [number, number],
  geojson:
    | d3.GeoGeometryObjects
    | d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
    | d3.ExtendedFeatureCollection<
        d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
      >
    | d3.ExtendedGeometryCollection<d3.GeoGeometryObjects>
) => {
  const projection = d3.geoMercator().fitSize([width, height], geojson)
  return d3.geoPath().projection(projection)
}

const Map = ({
  width = 600,
  height = 500,
}: {
  width?: number
  height?: number
}) => {
  const [paths, setPaths] = useState([])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getPath = pathGenerator([width, height], geojson)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const _paths = geojson?.features?.map((feature) => {
      const { properties, geometry } = feature
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const path = getPath(geometry)

      const d3path = d3.select(
        document.createElementNS("http://www.w3.org/2000/svg", "path")
      )
      d3path.attr("d", path)

      const pathLength = d3path?.node()?.getTotalLength()
      const center = d3path?.node()?.getPointAtLength(pathLength! / 2)
      return { ...properties, path, center }
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setPaths(_paths)
  }, [width, height])
  return (
    <Box
      as="svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
    >
      {paths.map(({ name, path }, index) => {
        return (
          <Box
            as="path"
            key={index}
            d={path}
            id={name}
            fill="#E1ECE8"
            stroke="#071655"
            _hover={{ opacity: 0.8, fill: "#57C7A1" }}
            _active={{ opacity: 0.8 }}
            cursor="pointer"
          />
        )
      })}
    </Box>
  )
}

export default Map
